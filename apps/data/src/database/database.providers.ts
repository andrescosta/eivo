import { DataSource } from 'typeorm';
import { SnakeCaseNamingStrategy } from './SnakeCaseNamingStrategy';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432",10) ,
        username: process.env.DB_USER,
        password: process.env.DB_USER_PWD,
        database: 'lingv',
        schema: 'app',
        logging: true,
        namingStrategy: new SnakeCaseNamingStrategy(), 
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        entities: [
            __dirname + '/../**/entities/*{.ts,.js}',
        ],
      });

      return dataSource.initialize();
    },
  },
];