import { HttpException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}

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
