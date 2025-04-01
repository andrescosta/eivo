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
export class Namespace extends EivoNamedEntity implements Translatable {
  @OneToMany((type) => Curriculum, (curriculum) => curriculum.namespace, {
    cascade: true,
    eager: true,
  })
  public curriculums!: Curriculum[];

  @OneToMany((type) => LLMSchema, (schema) => schema.namespace, {
    eager: true,
    cascade: true,
  })
  public llmSchemas!: LLMSchema[];

  @ManyToMany((type) => User, (user) => user.namespaces, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  public users!: User[];

  @OneToMany((type) => Course, (course) => course.namespace, {
    eager: true,
    cascade: true,
  })
  public courses!: Course[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => NamespaceTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true,
  })
  translations!: Array<Translation<Namespace>>;
}

@Entity()
export class NamespaceTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Namespace>
{
  @ManyToOne(() => Namespace)
  base!: Namespace;
}
