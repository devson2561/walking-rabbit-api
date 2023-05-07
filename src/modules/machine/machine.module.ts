import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import { MachineController } from './machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';

@Module({
  controllers: [MachineController],
  providers: [MachineService],
  imports: [TypeOrmModule.forFeature([Machine])],
})
export class MachineModule {}
