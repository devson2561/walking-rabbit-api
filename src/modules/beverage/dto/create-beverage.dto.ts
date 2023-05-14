import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBeverageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  configs: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  ingredients: CreateBeverageIngredientDto[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  processes: ProcessDto[];
}

export class ProcessDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  index: number;
}

export class CreateBeverageIngredientDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  ingredient_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  usage: number;
}
