import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Curriculum } from './Curriculum.entity';
import { EivoNamedEntity } from './EntityBase.entity';
import { Member } from './Member.entity';
import { Tenant } from './Tenant.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

@Entity()
export class Course extends EivoNamedEntity implements Translatable {
  @ManyToOne(() => Tenant)
  tenant!: Tenant;
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

