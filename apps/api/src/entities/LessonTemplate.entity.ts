import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Application } from './Application.entity';
import { ExerciseTemplate } from './ExerciseTemplate.entity';

type Data = Record<string, string | number | object>;

export class Prompt {
  @Column({ nullable: true })
  prompt?: string;

  @Column({ nullable: true })
  level?: string;
}

@Entity()
export class LessonTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  description!: string;

  @Column(() => Prompt)
  prompt!: Prompt;

  @OneToMany(() => ExerciseTemplate, (exercise) => exercise.lesson, { cascade: true })
  exercises!: ExerciseTemplate[];

  @ManyToOne(() => Application, (application) => application.lessons)
  application!: Application;
}
