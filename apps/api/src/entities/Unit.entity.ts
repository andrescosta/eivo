import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity } from './EntityBase.entity';
import { LessonTemplate } from './LessonTemplate.entity';

import { Subject } from './Subject.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';


@Entity()
export class Unit extends EivoNamedEntity implements Translatable {
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

  @ManyToOne(() => Subject)
  subject!: Subject;

  @OneToMany(() => LessonTemplate, (lessonTemplate) => lessonTemplate.unit, { cascade: true })
  lessonTemplates!: LessonTemplate[];

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
