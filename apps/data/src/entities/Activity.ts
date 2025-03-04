import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './Application';
import { LClass } from './LClass';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Application)
  application!: Application;

  @ManyToOne(() => LClass)
  class!: LClass;
}
