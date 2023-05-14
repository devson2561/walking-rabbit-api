import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiTags } from '@nestjs/swagger';
import { Machine } from './entities/machine.entity';

@ApiTags('Machine')
@Controller('api/machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machineService.create(createMachineDto);
  }

  @Get()
  findAll() {
    return this.machineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.machineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMachineDto: UpdateMachineDto) {
    return this.machineService.update(id, updateMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.machineService.remove(id);
  }

  @Get(':id/beverages')
  findBeverages(
    @Param('id') id: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.machineService.findBeverages(id, categoryId);
  }

  @Get(':id/stocks')
  findStocks(@Param('id') id: string) {
    return this.machineService.findMachineStocks(id);
  }

  @Post(':id/orders')
  createOrder(@Param('id') id: string) {
    return this.machineService.findMachineStocks(id);
  }
}
