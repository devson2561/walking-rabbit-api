import { Ingredient } from 'src/modules/ingredient/entities/ingredient.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Machine } from './machine.entity';

@Entity('machine-stocks')
export class MachineStock extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  machine_id: string;

  @ManyToOne(() => Machine, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'machine_id', referencedColumnName: 'id' })
  machine: Machine;

  @Column()
  ingredient_id: string;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient: Ingredient;

  @Column({ type: 'float', default: 0 })
  capacity: number;

  @Column({ type: 'float', default: 0 })
  stock: number;
}
