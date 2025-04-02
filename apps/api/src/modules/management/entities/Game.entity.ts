import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './Activity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from '../../common/entities/i18n';
import { EivoLabeledEntity } from '../../common/entities/EivoEntity.entity';

@Entity()
export class Game extends EivoLabeledEntity<Game> implements Translatable {
  @Column()
  date!: Date;

  @ManyToOne(() => Activity)
  activity!: Activity;

  /**
   * @autoMapIgnore
   */
  @OneToMany(() => GameTranslation, (translation) => translation.base, {
    eager: true,
    cascade: true
  })
  translations!: Array<Translation<Game>>;
}

@Entity()
export class GameTranslation
  extends EivoNamedEntityTranslation
  implements Translation<Game>
{
  @ManyToOne(() => Game)
  base!: Game;
}
