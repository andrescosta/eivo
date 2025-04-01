import { Command, CommandRunner, Option } from 'nest-commander';
import { LlmGenerateCommand } from './LlmGenerateCommand';

@Command({
  name: 'llm',
  arguments: '[command]',
  description: 'Execute script.',
  subCommands: [LlmGenerateCommand],
})
export class LlmCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run(): Promise<void> {
    console.log('llm');
  }
}
