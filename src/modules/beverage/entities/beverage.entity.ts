import { BeverageConfig } from 'src/modules/beverage-config/entities/beverage-config.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BeverageIngredient } from './beverage-ingredient.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Entity('beverages')
export class Beverage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToMany(() => BeverageConfig, { cascade: true, onUpdate: 'CASCADE' })
  @JoinTable()
  configs: BeverageConfig[];

  @OneToMany(
    () => BeverageIngredient,
    (beverageIngredient) => beverageIngredient.beverage,
  )
  ingredients: BeverageIngredient[];
}
