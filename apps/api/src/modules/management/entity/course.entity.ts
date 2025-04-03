import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Member } from './member.entity';
import { EivoLabeledEntity } from '../../common/entity/eivo-labeled-entity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entity/i18n';
import { Curriculum } from '../../catalog/entity/curriculum.entity';
import { EivoNamespace } from '../../common/entity/eivo-namespace.entity';

@Entity()
export class Course extends EivoLabeledEntity<Course> implements Translatable {
  @ManyToOne(() => EivoNamespace)
  eivoNamespace!: EivoNamespace;
  @ManyToOne(() => Curriculum)
  curriculum!: Curriculum;
  @ManyToMany(() => Member, (member) => member.course)
  members!: Member[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => CourseTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations!: Array<Translation<Course>>;
}

@Entity()
export class CourseTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Course>
{
  @ManyToOne(() => Course)
  base!: Course;
}

