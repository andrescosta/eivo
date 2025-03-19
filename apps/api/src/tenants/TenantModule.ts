import { Module } from '@nestjs/common';
import { TenantService } from './TenantService';
import { TenantController } from './TenantController';
import { TenantProfile } from './TenantProfile';
import { tenantProvider } from './TenantProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController],
  providers: [...tenantProvider, TenantService, TenantProfile],
})
export class TenantModule {}
