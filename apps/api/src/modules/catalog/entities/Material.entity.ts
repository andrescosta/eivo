import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './Lesson.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entities/i18n';
import { AnyData } from '@eivo/llm';
import { EivoLabeledEntity } from '../../common/entities/EivoEntity.entity';

@Entity()
export class Material extends EivoLabeledEntity<Material> {
  /**
   * @autoMapIgnore
   */
  @Column('json')
  parameters!: AnyData;

  @ManyToOne(() => Lesson)
  lesson!: Lesson;

  /**
   * @autoMapIgnore
   */
  @Column('json')
  schema!: AnyData;

  /**
   * @autoMapIgnore
   */
  @OneToMany(
    () => MaterialTemplateTranslation,
    (translation) => translation.base,
    {
      eager: true,
      cascade: true,
    },
  )
  translations!: Array<Translation<Material>>;
}

@Entity()
export class MaterialTemplateTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Material>
{
  @ManyToOne(() => Material)
  base!: Material;
}
