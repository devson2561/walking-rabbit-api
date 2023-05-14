import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from '../machine/entities/machine.entity';
import { Order } from './entities/order.entity';
import { Beverage } from '../beverage/entities/beverage.entity';
import { MachineStock } from '../machine/entities/machine-stock.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Machine, Order, Beverage, MachineStock])],
})
export class OrderModule {}
