import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLessonCommand } from './lesson-command';
import { AppLessonAddCommand } from './lesson-add-command';
import { AppModule } from '../app.module';
import { applicationProvider } from '../applications/ApplicationProvider';
import { ApplicationService } from '../applications/ApplicationService';
import { databaseProviders } from '../database/database.providers';

@Module({
  providers: [
    ...databaseProviders,
    ...applicationProvider,
    ApplicationService,
    AppLessonCommand,
    AppLessonAddCommand,
  ],
  imports: [AppModule, ConfigModule.forRoot()],
})
export class AppCommandModule {}
