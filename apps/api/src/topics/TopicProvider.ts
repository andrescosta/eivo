import { DataSource } from 'typeorm';
import { Topic } from '../entities/Topic.entity';

export const topicProviders = [
    {
        provide: 'TOPIC_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
        inject: ['DATA_SOURCE'],
    },
];
