import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ExerciseTemplate } from './ExerciseTemplate.entity';
import { Unit } from './Unit.entity';
import { MaterialTemplate } from './MaterialTemplate.entity';
import { Prompt } from './Template';

@Entity()
export class LessonTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  description!: string;

  @Column(() => Prompt)
  prompt!: Prompt;

  @OneToMany(() => ExerciseTemplate, (exercise) => exercise.lesson, {
    cascade: true,
  })
  exercises!: ExerciseTemplate[];

  @OneToMany(() => MaterialTemplate, (material) => material.lesson, {
    cascade: true,
  })
  material!: MaterialTemplate[];

  @ManyToOne(() => Unit, (unit) => unit.lessonTemplates)
  unit!: Unit;
}
