import { ActivityData } from './ActivityData';
import { NamedData } from './Data';

export class GameData extends NamedData {
  date!: Date;
  activity!: ActivityData;
}
