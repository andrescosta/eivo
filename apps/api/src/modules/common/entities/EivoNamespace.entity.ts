import {
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from '../../auth/entities/User.entity';
import { EivoLabeledEntity } from '../../common/entities/EivoEntity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entities/i18n';
import { Course } from '../../management/entities/Course.entity';
import { Curriculum } from '../../catalog/entities/Curriculum.entity';

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
