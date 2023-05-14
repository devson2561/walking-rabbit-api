import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { MachineStock } from './entities/machine-stock.entity';
import { Beverage } from '../beverage/entities/beverage.entity';

@Module({
  controllers: [MachineController],
  providers: [MachineService],
  imports: [TypeOrmModule.forFeature([Machine, MachineStock, Beverage])],
})
export class MachineModule {}
