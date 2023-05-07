import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BeverageConfigService } from './beverage-config.service';
import { CreateBeverageConfigDto } from './dto/create-beverage-config.dto';
import { UpdateBeverageConfigDto } from './dto/update-beverage-config.dto';

@ApiTags('Beverage Config')
@Controller('api/beverage-configs')
export class BeverageConfigController {
  constructor(private readonly beverageConfigService: BeverageConfigService) {}

  @Post()
  create(@Body() createBeverageConfigDto: CreateBeverageConfigDto) {
    return this.beverageConfigService.create(createBeverageConfigDto);
  }

  @Get()
  findAll() {
    return this.beverageConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beverageConfigService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeverageConfigDto: UpdateBeverageConfigDto,
  ) {
    return this.beverageConfigService.update(id, updateBeverageConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beverageConfigService.remove(id);
  }
}
