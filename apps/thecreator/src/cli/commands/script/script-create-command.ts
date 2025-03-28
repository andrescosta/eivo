import { Curriculum, CurriculumService, NamespaceService } from '@eivo/api';
import fs from 'fs';
import yaml from 'js-yaml';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { LLMSchema } from 'apps/api/dist/entities/LLMSchema.entity';
import { parse } from '../../../specs/MakerParser';
import { MakerSpec, SchemaSpec } from '../../../specs/Specs';

@SubCommand({ name: 'generate' })
export class ScriptExecCommand extends CommandRunner {
  constructor(
    private readonly namespaceService: NamespaceService,
    private readonly curriculumService: CurriculumService,
  ) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    if (input.length < 3){
      console.log("invalid arguments.");
      return;
    }
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const [maker, schemas] = parse(yamlString);
    const yaml_maker = yaml.dump(maker);
    const yaml_schemas = yaml.dump(Array.from(schemas.values()));
    fs.writeFileSync(input[1], yaml_schemas, 'utf8');
    fs.writeFileSync(input[2], yaml_maker, 'utf8');
    // const [curr, schs] = this.execute(maker, schemas) ?? [];
    // console.log(curr);
    // console.log(schs);
  }
  @Option({
    flags: '-d, --debug',
    description: 'Load and print.',
  })
  parseLoad(val: string) {
    return val;
  }
  execute(
    maker: MakerSpec,
    schemas: Map<string, SchemaSpec>,
  ): [Curriculum, LLMSchema] | null {
    return null;
  }
}
