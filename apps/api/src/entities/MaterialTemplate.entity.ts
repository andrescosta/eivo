import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity } from './EntityBase.entity';
import { LessonTemplate } from './LessonTemplate.entity';
import { AnyOf, ResultsCache, Learn } from './Template.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class MaterialTemplate extends EivoNamedEntity {
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
    () => MaterialTemplateTranslation,
    (translation) => translation.base,
    {
      eager: true,
      cascade: true
    },
  )
  translations!: Array<Translation<MaterialTemplate>>;
}

@Entity()
export class MaterialTemplateTranslation
  extends EivoNamedEntityTranslation
  implements Translation<MaterialTemplate>
{
  @ManyToOne(() => MaterialTemplate)
  base!: MaterialTemplate;
}
