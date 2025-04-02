import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { EivoLabeledEntity } from './EivoEntity.entity';
import { Unit } from './Unit.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class Syllabus extends EivoLabeledEntity<Syllabus> {
  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;

  @OneToMany(() => Unit, (unit) => unit.syllabus, { cascade: true })
  units!: Unit[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => SubjectTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true
  })
  translations!: Array<Translation<Syllabus>>;
}

@Entity()
export class SubjectTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Syllabus>
{
  @ManyToOne(() => Syllabus)
  base!: Syllabus;
}
