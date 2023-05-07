import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beverage-configs')
export class BeverageConfig extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  additional_price: number;
}
