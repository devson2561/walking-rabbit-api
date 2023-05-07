import { Module } from '@nestjs/common';
import { BeverageConfigService } from './beverage-config.service';
import { BeverageConfigController } from './beverage-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeverageConfig } from './entities/beverage-config.entity';

@Module({
  controllers: [BeverageConfigController],
  providers: [BeverageConfigService],
  imports: [TypeOrmModule.forFeature([BeverageConfig])],
})
export class BeverageConfigModule {}
