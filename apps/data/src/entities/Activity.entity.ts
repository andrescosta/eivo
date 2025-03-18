import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Application } from './Application.entity';
import { LClass } from './LClass.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => Application)
  application!: Application;

  @ManyToOne(() => LClass)
  class!: LClass;
}
