import { Module } from '@nestjs/common';
import { BeverageService } from './beverage.service';
import { BeverageController } from './beverage.controller';

@Module({
  controllers: [BeverageController],
  providers: [BeverageService]
})
export class BeverageModule {}
