import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Beverage } from '../beverage/entities/beverage.entity';
import { MachineStock } from '../machine/entities/machine-stock.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Beverage)
    private beverageRepo: Repository<Beverage>,

    @InjectRepository(MachineStock)
    private machineStockRepo: Repository<MachineStock>,
  ) {}

  async create(body: CreateOrderDto) {
    const beverage = await this.beverageRepo.findOne({
      where: { id: body.beverage_id },
      relations: ['configs', 'ingredients'],
    });

    const configs = beverage.configs.filter((c) => body.configs.includes(c.id));
    const total_price =
      beverage.price + configs.reduce((a, b) => a + b.additional_price, 0);

    const order = this.orderRepo.create({
      ...body,
      configs,
      total_price,
    });
    await this.orderRepo.save(order);

    // cut stock

    for (const bi of beverage.ingredients) {
      const { ingredient_id, usage } = bi;
      const stock = await this.machineStockRepo.findOne({
        where: {
          machine_id: body.machine_id,
          ingredient_id,
        },
      });

      if (stock) {
        stock.stock -= usage;
        await stock.save();
      }
    }

    return order;
  }

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: string): Promise<Order> {
    const data = await this.orderRepo.findOne({
      where: { id },
      relations: ['beverage', 'machine', 'configs'],
    });
    if (!data) {
      throw new HttpException('Invalid order id.', 400);
    }
    return data;
  }
}
