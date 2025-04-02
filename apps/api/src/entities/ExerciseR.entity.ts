import { Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from './EivoEntity.entity';
import { Exercise } from './Exercise.entity';

@Entity()
export class ExerciseR extends EivoEntity{

  @ManyToOne(() => Exercise)
  template!: Exercise;
}
