import {
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Syllabus } from './syllabus.entity';
import { EivoLabeledEntity } from '../../common/entity/eivo-labeled-entity.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entity/i18n';
import { EivoNamespace } from '../../common/entity/eivo-namespace.entity';

@Entity()
export class Curriculum extends EivoLabeledEntity<Curriculum> {
  @ManyToOne(() => EivoNamespace, (eivonamespace) => eivonamespace.curriculums)
  eivoNamespace!: EivoNamespace;

  @OneToMany(() => Syllabus, (subject) => subject.curriculum, { cascade: true })
  syllabuses!: Syllabus[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => CurriculumTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<Curriculum>>;
}

@Entity()
export class CurriculumTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Curriculum>
{
  @ManyToOne(() => Curriculum)
  base!: Curriculum;
}
