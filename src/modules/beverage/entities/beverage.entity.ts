import { BeverageConfig } from 'src/modules/beverage-config/entities/beverage-config.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BeverageIngredient } from './beverage-ingredient.entity';

@Entity('beverages')
export class Beverage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => BeverageConfig, { cascade: true, onUpdate: 'CASCADE' })
  @JoinTable()
  configs: BeverageConfig[];

  @OneToMany(
    () => BeverageIngredient,
    (beverageIngredient) => beverageIngredient.beverage,
  )
  ingredients: BeverageIngredient[];
}
