import {
  BaseEntity,
  Column,
  Entity,
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
}
