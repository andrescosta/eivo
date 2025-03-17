import { DataSource } from 'typeorm';
import { LClass } from '../entities/LClass';

export const lclassProvider = [
    {
        provide: 'LCLASS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(LClass),
        inject: ['DATA_SOURCE'],
    },
];
