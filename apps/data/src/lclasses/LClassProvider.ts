import { DataSource } from 'typeorm';
import { LClass } from '../entities/LClass.entity';

export const lclassProvider = [
    {
        provide: 'LCLASS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(LClass),
        inject: ['DATA_SOURCE'],
    },
];
