import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Course } from './Course.entity';
import { Curriculum } from './Curriculum.entity';
import {
  EivoNamedEntity,
} from './EntityBase.entity';
import { User } from './User.entity';
import { LLMSchema } from './LLMSchema.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

@Entity()
export class Tenant extends EivoNamedEntity implements Translatable {
  @OneToMany((type) => Curriculum, (curriculum) => curriculum.tenant, {
    cascade: true,
    eager: true,
  })
  public curriculums!: Curriculum[];

  @OneToMany((type) => LLMSchema, (schema) => schema.tenant, {
    eager: true,
    cascade: true,
  })
  public llmSchemas!: LLMSchema[];

  @ManyToMany((type) => User, (user) => user.tenants, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public users!: User[];

  @OneToMany((type) => Course, (course) => course.tenant, {
    eager: true,
    cascade: true,
  })
  public courses!: Course[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => TenantTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<Tenant>>;
}

@Entity()
export class TenantTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Tenant>
{
  @ManyToOne(() => Tenant)
  base!: Tenant;
}
