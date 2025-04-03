import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { EivoEntity } from '../../common/entities/EivoEntity.entity';
import { Member } from '../../management/entities/Member.entity';
import { EivoNamedEntityTranslation, Translation } from '../../common/entities/i18n';
import { EivoNamespace } from '../../common/entities/EivoNamespace.entity';

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
