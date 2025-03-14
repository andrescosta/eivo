import { DataSource } from "typeorm";
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot()
export const AppDataSource= new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432",10) ,
    username: process.env.DB_USER,
    password: process.env.DB_USER_PWD,
    database: 'lingv',
    schema: "app",
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    entities: [
        '../../apps/data/src/../**/entities/*{.ts,.js}',
    ],
  });