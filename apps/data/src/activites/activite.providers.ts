import { DataSource } from 'typeorm';
import { Activite } from '../entities/activite.entity';

export const activiteProviders = [
  {
    provide: 'ACTIVITE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Activite),
    inject: ['DATA_SOURCE'],
  },
];
