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
  @IsArray()
  @IsNotEmpty()
  configs: string[];

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  ingredients: CreateBeverageIngredientDto[];
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
