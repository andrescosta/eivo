import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity } from './EntityBase.entity';
import { Member } from './Member.entity';
import { Tenant } from './Tenant.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

@Entity()
export class User extends EivoNamedEntity implements Translatable{
  @ManyToMany(() => Tenant, (tenant) => tenant.users)
  @JoinTable()
  public tenants!: Tenant[];

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
