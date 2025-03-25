import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity, EivoNamedEntityTranslation, Translatable, Translation } from './EntityBase.entity';
import { LessonTemplate } from './LessonTemplate.entity';
import { AnyOf, ResultsCache, Learn } from './Template.entity';

@Entity()
export class ExerciseTemplate extends EivoNamedEntity implements Translatable {
  @Column()
  kind!: string;

  @Column()
  theme!: string;

  @Column()
  type!: string;

  @Column()
  prompt!: string;

  @Column()
  schema!: string;

  @Column(() => Learn)
  learn!: Learn;

  /**
   * @autoMapIgnore
   */
  @Column('json')
  variations!: Array<Record<string, AnyOf>>;

  @Column(() => ResultsCache)
  cache!: ResultsCache;

  @ManyToOne(() => LessonTemplate)
  lessonTemplate!: LessonTemplate;

  /**
   * @autoMapIgnore
   */
  @OneToMany(
    () => ExerciseTemplateTranslation,
    (translation) => translation.base,
    {
      eager: true,
      cascade: true
    },
  )
  translations!: Array<Translation<ExerciseTemplate>>;
}

@Entity()
export class ExerciseTemplateTranslation
  extends EivoNamedEntityTranslation
  implements Translation<ExerciseTemplate>
{
  @ManyToOne(() => ExerciseTemplate)
  base!: ExerciseTemplate;
}
