import {
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Syllabus } from './Syllabus.entity';
import { EivoLabeledEntity } from '../../common/entities/EivoLabeledEntity.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entities/i18n';
import { EivoNamespace } from '../../common/entities/EivoNamespace.entity';

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
