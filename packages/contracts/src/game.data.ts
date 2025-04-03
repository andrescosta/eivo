import { ActivityData } from './activity.data';
import { LabeledData } from './data';

export class GameData extends LabeledData {
  date!: Date;
  activity!: ActivityData;
}
