import { Beverage } from 'src/modules/beverage/entities/beverage.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('machines')
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('geometry')
  location: Point;

  @ManyToMany(() => Beverage, { cascade: true, onUpdate: 'CASCADE' })
  @JoinTable()
  beverages: Beverage[];
}
