import { DataSource } from 'typeorm';
import { Curriculum } from '../entities/Curriculum.entity';

export const lclassProvider = [
    {
        provide: 'LCLASS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Curriculum),
        inject: ['DATA_SOURCE'],
    },
];
