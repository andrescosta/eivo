import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { EivoNamedEntity } from './EntityBase.entity';
import { Unit } from './Unit.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class Subject extends EivoNamedEntity {
  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;

  @OneToMany(() => Unit, (unit) => unit.subject, { cascade: true })
  units!: Unit[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => SubjectTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true
  })
  translations!: Array<Translation<Subject>>;
}

@Entity()
export class SubjectTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Subject>
{
  @ManyToOne(() => Subject)
  base!: Subject;
}
