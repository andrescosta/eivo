import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EivoEntity } from '../../common/entity/eivo-entity.entity';
import { Member } from '../../management/entity/member.entity';
import {
  EivoNamedEntityTranslation,
  Translation,
} from '../../common/entity/i18n';
import { EivoNamespace } from '../../common/entity/eivo-namespace.entity';

@Entity()
export class User extends EivoEntity {
  @ManyToMany(() => EivoNamespace, (eivoNamespace) => eivoNamespace.users)
  public eivoNamespaces!: EivoNamespace[];

  @OneToMany(() => Member, (member) => member.user)
  public members?: Member[];

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => UserTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations!: Array<Translation<User>>;
}

@Entity()
export class UserTranslation
  extends EivoNamedEntityTranslation
  implements Translation<User>
{
  @ManyToOne(() => User)
  base!: User;
}
