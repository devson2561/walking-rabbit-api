import { HttpException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import seedData from './seed/ingredient-seed.json';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,

    @InjectDataSource() private dataSource: DataSource,
  ) {
    this.seed();
  }

  async seed() {
    const seedIds = seedData.map((s) => s.id);
    const exists = await this.ingredientRepo.find({
      where: { id: In(seedIds) },
      select: ['id'],
    });

    const existsIds = exists.map((e) => e.id);
    const nonExistData = seedData.filter((s) => !existsIds.includes(s.id));

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      for (const s of nonExistData) {
        await queryRunner.manager.save(this.ingredientRepo.create(s));
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  create(body: CreateIngredientDto) {
    const data = this.ingredientRepo.create(body);
    return this.ingredientRepo.save(data);
  }

  findAll() {
    return this.ingredientRepo.find();
  }

  async findOne(id: string) {
    const data = await this.ingredientRepo.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('Invalid ingredient id.', 400);
    }
    return data;
  }

  async update(id: string, body: UpdateIngredientDto) {
    await this.findOne(id);
    await this.ingredientRepo.update(id, body);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.ingredientRepo.delete(id);
    return {
      success: true,
    };
  }
}
