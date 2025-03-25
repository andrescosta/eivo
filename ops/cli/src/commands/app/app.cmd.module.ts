import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLessonCommand } from './lesson-command';
import { AppLessonAddCommand } from './lesson-add-command';
import { AppModule, curriculumProvider, CurriculumService, databaseProviders, tenantProvider, TenantService } from '@eivo/api';

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
