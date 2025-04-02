import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import {
  EivoLabeledEntity
} from './EivoEntity.entity';
import { Exercise } from './Exercise.entity';
import { Material } from './Material.entity';
import { Unit } from './Unit.entity';
import { EivoNamedEntityTranslation, Translation } from './i18n';

@Entity()
export class Lesson extends EivoLabeledEntity<Lesson> {
  @Column()
  prompt!: string;

  @OneToMany(() => Exercise, (exercise) => exercise.lesson, {
    cascade: true,
    eager: true,
  })
  exercises!: Exercise[];

  @OneToMany(() => Material, (material) => material.lesson, {
    cascade: true,
    eager: true,
  })
  materials!: Material[];

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
  translations!: Array<Translation<Lesson>>;
}

@Entity()
export class LessonTemplateTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Lesson>
{
  @ManyToOne(() => Lesson)
  base!: Lesson;
}
