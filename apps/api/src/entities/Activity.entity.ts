import { Column, Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from './EivoEntity.entity';
import { ExerciseR } from './ExerciseR.entity';
import { Exercise } from './Exercise.entity';
import { Member } from './Member.entity';

@Entity()
export class Activity extends EivoEntity {
  // @ManyToOne(() => Exercise)
  // exercise!: Exercise;

  // @ManyToOne(() => ExerciseR)
  // exerciseR!: ExerciseR;

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
