import { DataSource } from 'typeorm';
import { LearningTemplate } from '../entities/Application.entity';

export const applicationProvider = [
    {
        provide: 'APPLICATION_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(LearningTemplate),
        inject: ['DATA_SOURCE'],
    },
];
