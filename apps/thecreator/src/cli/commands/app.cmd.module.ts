import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule, curriculumProvider, CurriculumService, databaseProviders, namespaceProvider, NamespaceService } from '@eivo/api';

import { AppLessonAddCommand } from './lesson/lesson-add-command';
import { AppLessonCommand } from './lesson/lesson-command';
import { ScriptCommand } from './script/script-command';
import { ScriptExecCommand } from './script/script-create-command';


@Module({
  providers: [
    ...databaseProviders,
    ...namespaceProvider,
    ...curriculumProvider,
    NamespaceService,
    CurriculumService,
    AppLessonCommand,
    AppLessonAddCommand,
    ScriptCommand,
    ScriptExecCommand
  ],
  imports: [AppModule, ConfigModule.forRoot()],
})
export class AppCommandModule {}
