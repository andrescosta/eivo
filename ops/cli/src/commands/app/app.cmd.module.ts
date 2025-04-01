import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule, curriculumProvider, CurriculumService, databaseProviders, namespaceProvider, NamespaceService } from '@eivo/api';

import { AppLessonAddCommand } from './lesson/lesson-add-command';
import { AppLessonCommand } from './lesson/lesson-command';
import { LlmCommand } from './llm/LlmCommand';
import { LlmGenerateCommand } from './llm/LlmGenerateCommand';


@Module({
  providers: [
    ...databaseProviders,
    ...namespaceProvider,
    ...curriculumProvider,
    NamespaceService,
    CurriculumService,
    AppLessonCommand,
    AppLessonAddCommand,
    LlmCommand,
    LlmGenerateCommand
  ],
  imports: [AppModule, ConfigModule.forRoot()],
})
export class AppCommandModule {}
