import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EivoEntity, EivoLabeledEntity } from './EivoEntity.entity';
import { Member } from './Member.entity';
import { EivoNamespace } from './EivoNamespace.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

@Entity()
export class User extends EivoEntity { //extends EivoLabeledEntity<User> implements Translatable {
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
