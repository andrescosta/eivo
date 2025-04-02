import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoLabeledEntity } from './EivoEntity.entity';
import { Lesson } from './Lesson.entity';

import { Syllabus } from './Subject.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';


@Entity()
export class Unit extends EivoLabeledEntity<Unit> implements Translatable {
  /**
   * @autoMapIgnore
   */
  @Column({ nullable: true })
  smallImage?: string;

  /**
   * @autoMapIgnore
   */
  @Column({ nullable: true })
  bigImage?: string;

  @ManyToOne(() => Syllabus)
  syllabus!: Syllabus;

  @OneToMany(() => Lesson, (lessonTemplate) => lessonTemplate.unit, { cascade: true })
  lessons!: Lesson[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => UnitTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true
  })
  translations!: Array<Translation<Unit>>;
}

@Entity()
export class UnitTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Unit>
{
  @ManyToOne(() => Unit)
  base!: Unit;
}
