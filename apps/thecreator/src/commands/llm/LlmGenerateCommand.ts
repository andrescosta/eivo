import { CurriculumService, NamespaceService } from '@eivo/api';
import fs from 'fs';
import yaml from 'js-yaml';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { LlmGenerator } from '@eivo/llm';

@SubCommand({ name: 'execute' })
export class LlmGenerateCommand extends CommandRunner {
  constructor(
    private readonly namespaceService: NamespaceService,
    private readonly curriculumService: CurriculumService,
  ) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    if (input.length == 0) {
      console.error('invalid arguments.');
      return;
    }

    const res = await (
      await LlmGenerator.build([input[0]])
    ).generate('curriculumO', options['system']);
    fs.writeFileSync(input[1], yaml.dump(res));
  }
  @Option({
    flags: '-s, --system [spec name]',
    description: 'Spec name for System prompt.',
  })
  parseSystem(val: string) {
    return val;
  }
}
