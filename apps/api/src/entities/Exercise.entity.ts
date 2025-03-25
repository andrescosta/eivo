import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseTemplate } from './ExerciseTemplate.entity';
import { EivoEntity } from './EntityBase.entity';

@Entity()
export class Exercise extends EivoEntity{

  @ManyToOne(() => ExerciseTemplate)
  template!: ExerciseTemplate;
}
