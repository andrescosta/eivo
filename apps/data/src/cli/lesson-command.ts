import { Command, CommandRunner, Option } from 'nest-commander';
import { SQLExecutorService } from '../database/sqlexecutor.service';
import { AppLessonAddCommand } from './lesson-add-command';

@Command({
  name: 'app:lesson',
  arguments: '[path]',
  description: 'Insert lessons.',
  subCommands: [AppLessonAddCommand],
})
export class AppLessonCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run(): Promise<void> {
    console.log('lesson');
  }
}
