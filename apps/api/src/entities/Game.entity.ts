import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './Activity.entity';
import { EivoLabeledEntity  } from './EivoEntity.entity';
import { EivoNamedEntityTranslation, Translatable, Translation } from './i18n';

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
