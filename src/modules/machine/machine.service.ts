import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';

import seedData from './seed/machine-seed.json';
import { MachineStock } from './entities/machine-stock.entity';
import { Beverage } from '../beverage/entities/beverage.entity';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private machineRepo: Repository<Machine>,

    @InjectRepository(MachineStock)
    private machineStockRepo: Repository<MachineStock>,

    @InjectRepository(Beverage)
    private beverageRepo: Repository<Beverage>,

    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.seed();
  }

  async seed(): Promise<void> {
    const seedIds = seedData.map((s) => s.id);
    const exists = await this.machineRepo.find({
      where: { id: In(seedIds) },
      select: ['id'],
    });

    const existsIds = exists.map((e) => e.id);
    const nonExistData = seedData.filter((s) => !existsIds.includes(s.id));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const s of nonExistData) {
        await queryRunner.manager.save(
          this.machineRepo.create({
            ...s,
            location: {
              type: 'Point',
              coordinates: s.location,
            },
          }),
        );
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create(body: CreateMachineDto): Promise<Machine> {
    const { title, location, stocks, beverages: beverage_ids } = body;
    // create machine
    const data = this.machineRepo.create({
      title,
      location: {
        type: 'Point',
        coordinates: location,
      },
    });

    // set beverages
    if (beverage_ids) {
      const beverages = await this.beverageRepo.find({
        where: {
          id: In(beverage_ids),
        },
      });
      data.beverages = beverages;
    }

    await this.machineRepo.save(data);

    // insert stock
    if (stocks) {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.startTransaction();

      try {
        for (const s of stocks) {
          await queryRunner.manager.save(
            this.machineStockRepo.create({
              ...s,
              machine_id: data.id,
            }),
          );
        }
        await queryRunner.commitTransaction();
        await queryRunner.release();
      } catch (err) {
        console.error(err);

        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        await this.machineRepo.remove(data);

        throw err;
      }
    }

    return data;
  }

  findAll(): Promise<Machine[]> {
    return this.machineRepo.find();
  }

  async findOne(id: string): Promise<Machine> {
    const data = await this.machineRepo.findOne({
      where: { id },
      relations: ['beverages', 'beverages.ingredients'],
    });
    if (!data) {
      throw new HttpException('Invalid category id.', 400);
    }
    return data;
  }

  async update(id: string, body: UpdateMachineDto): Promise<object> {
    const data = await this.findOne(id);
    const { beverages: beverage_ids, stocks } = body;

    // set beverages
    if (beverage_ids) {
      const beverages = await this.beverageRepo.find({
        where: {
          id: In(beverage_ids),
        },
      });

      data.beverages = beverages;
    }

    if (body.title) {
      data.title = body.title;
    }

    if (body.location) {
      data.location = {
        type: 'Point',
        coordinates: body.location,
      };
    }

    await data.save();

    // insert stock
    if (stocks) {
      for (const s of stocks) {
        const exist = await this.machineStockRepo.findOne({
          where: {
            ingredient_id: s.ingredient_id,
            machine_id: data.id,
          },
        });
        if (!exist) {
          await this.machineStockRepo.save(
            this.machineStockRepo.create({
              ...s,
              machine_id: data.id,
            }),
          );
        } else {
          exist.capacity = s.capacity;
          exist.stock = s.stock;

          await exist.save();
        }
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<object> {
    await this.findOne(id);
    await this.machineRepo.delete(id);
    return {
      success: true,
    };
  }

  async findBeverages(id: string, categoryId?: string): Promise<Beverage[]> {
    const machine = await this.findOne(id);

    // get products of machines to matche categoryId
    const valid_products = categoryId
      ? machine.beverages.filter((b) => b.category_id === categoryId)
      : machine.beverages;

    return valid_products;
  }

  async findMachineStocks(
    id: string,
    categoryId?: string,
  ): Promise<MachineStock[]> {
    const stocks = await this.machineStockRepo.find({
      where: {
        machine_id: id,
      },
      relations: ['ingredient'],
    });

    return stocks;
  }

  async createOrder(id: string): Promise<any> {
    console.log(id, ' <------- id');
  }
}
