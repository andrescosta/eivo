import { ActivityData } from './ActivityData';
import { LabeledData } from './Data';

export class GameData extends LabeledData {
  date!: Date;
  activity!: ActivityData;
}
