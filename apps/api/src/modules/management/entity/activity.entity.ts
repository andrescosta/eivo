import { Column, Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from '../../common/entity/eivo-entity.entity';
import { Member } from './member.entity';

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
