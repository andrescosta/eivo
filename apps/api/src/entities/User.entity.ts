import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EivoNamedEntity, EivoNamedEntityTranslation } from './EntityBase.entity';
import { Member } from './Member.entity';
import { Tenant } from './Tenant.entity';
import { Translation } from './EntityBase.entity';

@Entity()
export class User extends EivoNamedEntity {
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
