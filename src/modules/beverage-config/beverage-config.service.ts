import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { CreateBeverageConfigDto } from './dto/create-beverage-config.dto';
import { UpdateBeverageConfigDto } from './dto/update-beverage-config.dto';

import { BeverageConfig } from './entities/beverage-config.entity';

import seedData from './seed/beverage-config-seed.json';

@Injectable()
export class BeverageConfigService {
  constructor(
    @InjectRepository(BeverageConfig)
    private beverageConfigRepo: Repository<BeverageConfig>,

    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.seed();
  }

  async seed() {
    const seedIds = seedData.map((s) => s.id);
    const exists = await this.beverageConfigRepo.find({
      where: { id: In(seedIds) },
      select: ['id'],
    });

    const existsIds = exists.map((e) => e.id);
    const nonExistData = seedData.filter((s) => !existsIds.includes(s.id));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const s of nonExistData) {
        console.log(s, ' <------- s');
        await queryRunner.manager.save(this.beverageConfigRepo.create(s));
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  create(body: CreateBeverageConfigDto) {
    const data = this.beverageConfigRepo.create(body);
    return this.beverageConfigRepo.save(data);
  }

  findAll() {
    return this.beverageConfigRepo.find();
  }

  async findOne(id: string) {
    const data = await this.beverageConfigRepo.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('Invalid ingredient id.', 400);
    }
    return data;
  }

  async update(id: string, body: UpdateBeverageConfigDto) {
    await this.findOne(id);
    await this.beverageConfigRepo.update(id, body);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.beverageConfigRepo.delete(id);
    return {
      success: true,
    };
  }
}
