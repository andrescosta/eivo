import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from './curriculum.entity';
import { Unit } from './unit.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entity/i18n';
import { EivoLabeledEntity } from '../../common/entity/eivo-labeled-entity.entity';

@Entity()
export class Syllabus extends EivoLabeledEntity<Syllabus> {
  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;

  @OneToMany(() => Unit, (unit) => unit.syllabus, { cascade: true })
  units!: Unit[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => SyllabusTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true
  })
  translations!: Array<Translation<Syllabus>>;
}

@Entity()
export class SyllabusTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Syllabus>
{
  @ManyToOne(() => Syllabus)
  base!: Syllabus;
}
