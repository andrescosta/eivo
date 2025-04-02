import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { EivoLabeledEntity } from './EivoEntity.entity';
import { Member } from './Member.entity';
import { EivoNamespace } from './EivoNamespace.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

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

