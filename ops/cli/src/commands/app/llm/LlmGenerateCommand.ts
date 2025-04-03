import {
  Curriculum,
  CurriculumService,
  EivoEntity,
  EivoNamespace,
  EivoNamespaceService,
  convert,
} from '@eivo/api';
import { LlmGenerator } from '@eivo/llm';
import fs from 'fs';
import yaml from 'js-yaml';
import { CommandRunner, Option, SubCommand } from 'nest-commander';

@SubCommand({ name: 'generate' })
export class LlmGenerateCommand extends CommandRunner {
  constructor(
    private readonly namespaceService: EivoNamespaceService,
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
    const e = Array.isArray(res) ? convert(res) : convert(res);
    this.storeIfSupported(e);
    if (input.length > 2) {
      fs.writeFileSync(input[1], yaml.dump(e));
    }
  }
  storeIfSupported(e: EivoEntity | EivoEntity[]) {
    if (Array.isArray(e)) {
      e.forEach((p) => this.storeIfSupported(p));
    } else {
      switch (true) {
        case e instanceof Curriculum:
          this.curriculumService.save(e);
          break;
        case e instanceof EivoNamespace:
          this.namespaceService.save(e);
          break;
        default:
          console.log(`Value ${typeof e} not stored`);
      }
    }
  }
  @Option({
    flags: '-s, --system [spec name]',
    description: 'Spec name for System prompt.',
  })
  parseSystem(val: string) {
    return val;
  }
}
