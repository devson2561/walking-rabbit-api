import { Ingredient } from 'src/modules/ingredient/entities/ingredient.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Beverage } from './beverage.entity';

@Entity('beverage-ingredients')
export class BeverageIngredient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  beverage_id: string;

  @Column()
  ingredient_id: string;

  @ManyToOne(() => Beverage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'beverage_id', referencedColumnName: 'id' })
  beverage: Beverage;

  @ManyToOne(() => Ingredient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient: Ingredient;

  @Column('float')
  usage: number;
}
