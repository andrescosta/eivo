import { DataSource } from 'typeorm';
import { Activity } from '../entity/activity.entity';

export const activityProvider = [
  {
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Activity),
    inject: ['DATA_SOURCE'],
  },
];
