import { Column, Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from './EntityBase.entity';
import { Exercise } from './Exercise.entity';
import { ExerciseTemplate } from './ExerciseTemplate.entity';
import { Member } from './Member.entity';

@Entity()
export class Activity extends EivoEntity {
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
