import { Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from '../../common/entities/EivoEntity.entity';
import { Exercise } from '../../catalog/entities/Exercise.entity';

@Entity()
export class ExerciseR extends EivoEntity{

  @ManyToOne(() => Exercise)
  template!: Exercise;
}
