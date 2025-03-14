import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLessonCommand } from './lesson-command';
import { AppLessonAddCommand } from './lesson-add-command';
import { AppModule } from '@lingv/data';
import { applicationProvider } from '@lingv/data';
import { ApplicationService } from '@lingv/data';
import { databaseProviders } from '@lingv/data';

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
