import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  beverage_id: string;

  @ApiProperty()
  machine_id: string;

  @ApiProperty()
  configs: string[];
}
