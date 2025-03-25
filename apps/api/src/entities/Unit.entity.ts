import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity, EivoNamedEntityTranslation } from './EntityBase.entity';
import { LessonTemplate } from './LessonTemplate.entity';
import { LLMSchema } from './LLMSchema.entity';
import { Subject } from './Subject.entity';
import { Translation } from './EntityBase.entity';

@Entity()
export class Unit extends EivoNamedEntity {
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
