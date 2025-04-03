import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './Lesson.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entities/i18n';
import { AnyData } from '@eivo/llm';
import { EivoLabeledEntity } from '../../common/entities/EivoLabeledEntity.entity';

@Entity()
export class Exercise
  extends EivoLabeledEntity<Exercise>
  implements Translatable
{
  /**
   * @autoMapIgnore
   */
  @Column('json')
  parameters!: AnyData;

  /**
   * @autoMapIgnore
   */
  @Column('json')
  schema!: AnyData;

  @ManyToOne(() => Lesson)
  lesson!: Lesson;

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => ExerciseTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<Exercise>>;
}

@Entity()
export class ExerciseTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Exercise>
{
  @ManyToOne(() => Exercise)
  base!: Exercise;
}
