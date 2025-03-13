import { Module } from '@nestjs/common';
import { DbExecSqlCommand } from './exec-sql.command';
import { SQLExecutorService } from '../database/sqlexecutor.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    SQLExecutorService,
    DbExecSqlCommand,
  ],
  imports: [ConfigModule.forRoot()],
})
export class DbCommandModule {}
