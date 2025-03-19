import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Activity } from './Activity.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  date!: Date;

  @ManyToOne(() => Activity)
  activity!: Activity;
}
