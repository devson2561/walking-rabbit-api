import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMachineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  location: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  stocks?: CreateMachineStockDto[];


  @ApiProperty()
  @IsArray()
  @IsOptional()
  beverages?: string[];
}

export class CreateMachineStockDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  ingredient_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
