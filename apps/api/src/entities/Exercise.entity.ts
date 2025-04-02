import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoLabeledEntity } from './EivoEntity.entity';
import { Lesson } from './Lesson.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';
import { AnyData } from '@eivo/llm';

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
