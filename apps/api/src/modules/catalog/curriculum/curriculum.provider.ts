import { DataSource } from 'typeorm';
import { Curriculum } from '../entity/curriculum.entity';


export const curriculumProvider = [
    {
        provide: 'CURRICULUM_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Curriculum),
        inject: ['DATA_SOURCE'],
    },
];
