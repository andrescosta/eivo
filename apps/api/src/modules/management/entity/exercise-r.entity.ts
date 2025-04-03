import { Entity, ManyToOne } from 'typeorm';
import { EivoEntity } from '../../common/entity/eivo-entity.entity';
import { Exercise } from '../../catalog/entity/exercise.entity';

@Entity()
export class ExerciseR extends EivoEntity{

  @ManyToOne(() => Exercise)
  template!: Exercise;
}
