import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  create(body: CreateCategoryDto) {
    return this.categoryRepo.create(body);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: string) {
    const data = await this.categoryRepo.findOne({ where: { id } });
    if (!data) {
      throw new HttpException('Invalid category id.', 400);
    }
    return data;
  }

  async update(id: string, body: UpdateCategoryDto) {
    await this.findOne(id);
    this.update(id, body);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.categoryRepo.delete(id);
    return {
      success: true,
    };
  }
}
