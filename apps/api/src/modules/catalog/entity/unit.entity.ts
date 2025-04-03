import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Lesson } from './lesson.entity';

import { Syllabus } from './syllabus.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entity/i18n';
import { EivoLabeledEntity } from '../../common/entity/eivo-labeled-entity.entity';


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
