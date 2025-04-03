import { DataSource } from 'typeorm';
import { SnakeCaseNamingStrategy } from './snake-case-naming.strategy';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USER ?? 'postgres',
        password: process.env.DB_USER_PWD ?? 'postgres',
        database: 'eivo',
        schema: 'app',
        logging: [
          'query',
          'schema',
          'error',
          'warn',
          'info',
          'log',
          'migration',
        ],
        namingStrategy: new SnakeCaseNamingStrategy(),
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        //entities: ['/home/andres/projs/eivo/apps/api/src/entities/*.entity.ts'],
        entities: [__dirname + '/../../**/entity/*{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
