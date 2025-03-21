import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { ExerciseTemplate } from './ExerciseTemplate.entity';
import { Exercise } from './Exercise';
import { Member } from './Member.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => ExerciseTemplate)
  exerciseTemplate!: ExerciseTemplate;

  @ManyToOne(() => Exercise)
  exercise!: Exercise;

  @ManyToOne(() => Member, (member) => member.activities)
  member?: Member;

  @Column()
  status!: Status;

  @Column({ nullable: true })
  note?: number;

  @Column()
  dateStatusUpdated!: Date;
}

export enum Status {
  COMPLETED,
  INPROGRESS,
  ASSIGNED,
}
