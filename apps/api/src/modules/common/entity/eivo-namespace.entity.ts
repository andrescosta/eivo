import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { EivoLabeledEntity } from './eivo-labeled-entity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';
import { Course } from '../../management/entity/course.entity';
import { Curriculum } from '../../catalog/entity/curriculum.entity';

@Entity()
export class EivoNamespace extends EivoLabeledEntity<EivoNamespace> implements Translatable {
  @OneToMany((type) => Curriculum, (curriculum) => curriculum.eivoNamespace, {
    cascade: true,
    eager: true,
  })
  public curriculums!: Curriculum[];

  @ManyToMany((type) => User, (user) => user.eivoNamespaces, {
    eager: true,
    cascade: true,
  })
  public users!: User[];

  @OneToMany((type) => Course, (course) => course.eivoNamespace, {
    eager: true,
    cascade: true,
  })
  public courses!: Course[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => EivoNamespaceTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<EivoNamespace>>;
}

@Entity()
export class EivoNamespaceTranslation
  extends EivoNamedEntityTranslation
  implements Translation<EivoNamespace>
{
  @ManyToOne(() => EivoNamespace)
  base!: EivoNamespace;
}
