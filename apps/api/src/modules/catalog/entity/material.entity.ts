import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entity/i18n';
import { AnyData } from '@eivo/llm';
import { EivoLabeledEntity } from '../../common/entity/eivo-labeled-entity.entity';

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
