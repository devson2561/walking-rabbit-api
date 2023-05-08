import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, In, Point, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { Machine } from './entities/machine.entity';

import seedData from './seed/machine-seed.json';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private machineRepo: Repository<Machine>,

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

  create(body: CreateMachineDto): Promise<Machine> {
    const data = this.machineRepo.create({
      ...body,
      location: {
        type: 'Point',
        coordinates: body.location,
      },
    });
    return this.machineRepo.save(data);
  }

  findAll(): Promise<Machine[]> {
    return this.machineRepo.find();
  }

  async findOne(id: string): Promise<Machine> {
    const data = await this.machineRepo.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('Invalid category id.', 400);
    }
    return data;
  }

  async update(id: string, body: UpdateCategoryDto): Promise<object> {
    await this.findOne(id);
    await this.machineRepo.update(id, body);
    return this.findOne(id);
  }

  async remove(id: string): Promise<object> {
    await this.findOne(id);
    await this.machineRepo.delete(id);
    return {
      success: true,
    };
  }
}
