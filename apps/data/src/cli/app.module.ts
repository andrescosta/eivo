import { Module } from '@nestjs/common';
import { InitDbCommand } from './init-db.command';
import { DatabaseInitService } from '../database/init-database.service';

@Module({
    providers: [DatabaseInitService,InitDbCommand]
  })
  export class AppModule {}