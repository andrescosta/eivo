import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  EivoNamedEntity,
  EivoNamedEntityTranslation,
  Translation,
} from './EntityBase.entity';
import { Tenant } from './Tenant.entity';
import { Subject } from './Subject.entity';

@Entity()
export class Curriculum extends EivoNamedEntity {
  @ManyToOne(() => Tenant, (tenant) => tenant.curriculums)
  tenant!: Tenant;

  @OneToMany(() => Subject, (subject) => subject.curriculum, { cascade: true })
  subjects!: Subject[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => CurriculumTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<Curriculum>>;
}

@Entity()
export class CurriculumTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Curriculum>
{
  @ManyToOne(() => Curriculum)
  base!: Curriculum;
}
