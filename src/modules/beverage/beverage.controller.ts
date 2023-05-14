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
import { BeverageService } from './beverage.service';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Beverage')
@Controller('api/beverages')
export class BeverageController {
  constructor(private readonly beverageService: BeverageService) {}

  @Post()
  create(@Body() createBeverageDto: CreateBeverageDto) {
    return this.beverageService.create(createBeverageDto);
  }

  @Get()
  findAll() {
    return this.beverageService.findAll();
  }

  @Get('ingredients')
  findIngredients(@Query('beverages') beverageIds: string[]) {
    return this.beverageService.findIngredientsOfBeverages(beverageIds ?? []);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beverageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBeverageDto: UpdateBeverageDto,
  ) {
    return this.beverageService.update(id, updateBeverageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beverageService.remove(id);
  }
}
