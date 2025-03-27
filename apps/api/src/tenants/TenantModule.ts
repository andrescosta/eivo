import { Module } from '@nestjs/common';
import { TenantService } from './TenantService';
import { tenantProvider } from './TenantProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...tenantProvider, TenantService],
})
export class TenantModule {}
