import { BeverageConfig } from 'src/modules/beverage-config/entities/beverage-config.entity';
import { Beverage } from 'src/modules/beverage/entities/beverage.entity';
import { Machine } from 'src/modules/machine/entities/machine.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  total_price: number;

  @Column()
  machine_id: string;

  @ManyToOne(() => Machine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'machine_id', referencedColumnName: 'id' })
  machine: Machine;

  @Column()
  beverage_id: string;

  @ManyToOne(() => Beverage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'beverage_id', referencedColumnName: 'id' })
  beverage: Beverage;

  @ManyToMany(() => BeverageConfig, { cascade: true, onUpdate: 'CASCADE' })
  @JoinTable()
  configs: BeverageConfig[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
