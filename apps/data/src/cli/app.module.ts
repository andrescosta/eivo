import { Module } from '@nestjs/common';
import { ExecSqlCommand } from './exec-sql.command';
import { SQLExecutorService } from '../database/sqlexecutor.service';
import { ConfigModule } from '@nestjs/config';


@Module({
    providers: [SQLExecutorService,ExecSqlCommand],
    imports: [ConfigModule.forRoot()]
  })
  export class AppModule {}