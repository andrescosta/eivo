import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule, curriculumProvider, CurriculumService, databaseProviders, tenantProvider, TenantService } from '@eivo/api';
import { AppLessonCommand } from './lesson-command';
import { AppLessonAddCommand } from './lesson-add-command';

@Module({
  providers: [
    ...databaseProviders,
    ...tenantProvider,
    ...curriculumProvider,
    TenantService,
    CurriculumService,
    AppLessonCommand,
    AppLessonAddCommand,
  ],
  imports: [AppModule, ConfigModule.forRoot()],
})
export class AppCommandModule {}
