import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  EivoNamedEntity
} from './EntityBase.entity';
import { ExerciseTemplate } from './ExerciseTemplate.entity';
import { MaterialTemplate } from './MaterialTemplate.entity';
import { Unit } from './Unit.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class LessonTemplate extends EivoNamedEntity {
  @Column()
  prompt!: string;

  @OneToMany(() => ExerciseTemplate, (exercise) => exercise.lessonTemplate, {
    cascade: true,
    eager: true,
  })
  exerciseTemplates!: ExerciseTemplate[];

  @OneToMany(() => MaterialTemplate, (material) => material.lessonTemplate, {
    cascade: true,
    eager: true,
  })
  materialTemplates!: MaterialTemplate[];

  @ManyToOne(() => Unit)
  unit!: Unit;

  /**
   * @autoMapIgnore
   */
  @OneToMany(
    () => LessonTemplateTranslation,
    (translation) => translation.base,
    {
      eager: true,
      cascade: true,
    },
  )
  translations!: Array<Translation<LessonTemplate>>;
}

@Entity()
export class LessonTemplateTranslation
  extends EivoNamedEntityTranslation
  implements Translation<LessonTemplate>
{
  @ManyToOne(() => LessonTemplate)
  base!: LessonTemplate;
}
