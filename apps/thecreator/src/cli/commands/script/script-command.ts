import { Command, CommandRunner, Option } from 'nest-commander';
import { ScriptExecCommand } from './script-create-command';

@Command({
  name: 'llm',
  arguments: '[command]',
  description: 'Execute script.',
  subCommands: [ScriptExecCommand],
})
export class ScriptCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run(): Promise<void> {
    console.log('llm');
  }
}
