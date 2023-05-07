import { PartialType } from '@nestjs/mapped-types';
import { CreateBeverageConfigDto } from './create-beverage-config.dto';

export class UpdateBeverageConfigDto extends PartialType(CreateBeverageConfigDto) {}
