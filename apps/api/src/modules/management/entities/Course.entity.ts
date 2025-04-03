import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Member } from './Member.entity';
import { EivoLabeledEntity } from '../../common/entities/EivoLabeledEntity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entities/i18n';
import { Curriculum } from '../../catalog/entities/Curriculum.entity';
import { EivoNamespace } from '../../common/entities/EivoNamespace.entity';

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

