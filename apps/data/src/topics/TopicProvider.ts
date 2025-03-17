import { DataSource } from 'typeorm';
import { Topic } from '../entities/Topic';

export const topicProviders = [
    {
        provide: 'TOPIC_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
        inject: ['DATA_SOURCE'],
    },
];
