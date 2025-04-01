import {
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import {
  EivoNamedEntity,
} from './EntityBase.entity';
import { Subject } from './Subject.entity';
import { Namespace } from './Namespace.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class Curriculum extends EivoNamedEntity {
  @ManyToOne(() => Namespace, (namespace) => namespace.curriculums)
  namespace!: Namespace;

  @OneToMany(() => Subject, (subject) => subject.curriculum, { cascade: true })
  subjects!: Subject[];

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
