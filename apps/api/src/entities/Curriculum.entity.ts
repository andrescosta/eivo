import {
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import {
  EivoLabeledEntity,
} from './EivoEntity.entity';
import { Syllabus } from './Subject.entity';
import { EivoNamespace } from './EivoNamespace.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

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
