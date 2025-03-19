import { Module } from '@nestjs/common';
import { DomainService } from './DomainService';
import { DomainController } from './DomainController';
import { DomainProfile } from './DomainProfile';
import { domainProvider } from './DomainProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DomainController],
  providers: [...domainProvider, DomainService, DomainProfile],
})
export class DomainModule {}
