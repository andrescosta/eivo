import { Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from './EntityBase.entity';
import { ExerciseTemplate } from './ExerciseTemplate.entity';

@Entity()
export class Exercise extends EivoEntity{

  @ManyToOne(() => ExerciseTemplate)
  template!: ExerciseTemplate;
}
