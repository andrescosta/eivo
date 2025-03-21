import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseTemplate } from './ExerciseTemplate.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ManyToOne(() => ExerciseTemplate)
  template!: ExerciseTemplate;
}
