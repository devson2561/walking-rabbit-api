import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beverage-configs')
export class BeverageConfig extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column({ default: false })
  is_multiple: boolean;

  @Column({ default: false })
  is_default: boolean;

  @Column({ type: 'int', nullable: false, default: 0 })
  additional_price: number;
}
