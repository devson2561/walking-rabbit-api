import { HttpException, Injectable } from '@nestjs/common';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { Beverage } from './entities/beverage.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { BeverageConfig } from '../beverage-config/entities/beverage-config.entity';
import { BeverageIngredient } from './entities/beverage-ingredient.entity';

@Injectable()
export class BeverageService {
  constructor(
    @InjectRepository(Beverage)
    private beverageRepo: Repository<Beverage>,

    @InjectRepository(BeverageConfig)
    private beverageConfigRepo: Repository<BeverageConfig>,

    @InjectRepository(BeverageIngredient)
    private beverageIngredientRepo: Repository<BeverageIngredient>,

    @InjectDataSource() private dataSource: DataSource,
  ) {
    // this.seed();
  }

  async create(body: CreateBeverageDto) {
    const configs = await this.beverageConfigRepo.find({
      where: { id: In(body.configs) },
    });

    const data = this.beverageRepo.create({
      ...body,
      configs,
    });

    await this.beverageRepo.save(data);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const i of body.ingredients) {
        await queryRunner.manager.save(
          this.beverageIngredientRepo.create({
            ...i,
            beverage_id: data.id,
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

  findAll() {
    return this.beverageRepo.find();
  }

  async findOne(id: string) {
    const data = await this.beverageRepo.findOne({
      where: { id },
      relations: ['configs', 'ingredients'],
    });
    if (!data) {
      throw new HttpException('Invalid ingredient id.', 400);
    }

    return data;
  }

  async update(id: string, body: UpdateBeverageDto) {
    const data = await this.findOne(id);

    if (body.title) {
      data.title = body.title;
    }

    if (body.configs) {
      const configs = await this.beverageConfigRepo.find({
        where: { id: In(body.configs) },
      });
      data.configs = configs;
    }

    await this.beverageRepo.save(data);

    return data;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.beverageRepo.delete(id);
    return {
      success: true,
    };
  }
}
