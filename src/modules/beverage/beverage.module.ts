import { Module } from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './entities/beverage.entity';
import { BeverageConfig } from '../beverage-config/entities/beverage-config.entity';
import { BeverageIngredient } from './entities/beverage-ingredient.entity';

@Module({
  controllers: [BeverageController],
  providers: [BeverageService],
  imports: [
    TypeOrmModule.forFeature([Beverage, BeverageConfig, BeverageIngredient]),
  ],
})
export class BeverageModule {}
