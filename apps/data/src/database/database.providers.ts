import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db.jobico.local',
        port: 5432,
        username: 'lingv_service',
        password: 'lingv',
        database: 'lingv',
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        ssl: true
      });

      return dataSource.initialize();
    },
  },
];