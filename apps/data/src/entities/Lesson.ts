import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Application } from './Application';
import { Exercise } from './Exercise';

type Data = Record<string, string | number | object>;

export class Prompt {
  @Column({ nullable: true })
  system?: string;

  @Column({ nullable: true })
  level?: string;
}

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  description!: string;

  @Column(() => Prompt)
  prompt!: Prompt;

  @OneToMany(() => Exercise, (exercise) => exercise.lesson, { cascade: true })
  exercises!: Exercise[];

  @ManyToOne(() => Application, (application) => application.lessons)
  application!: Application;
}
