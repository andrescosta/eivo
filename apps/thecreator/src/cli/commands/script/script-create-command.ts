import { CurriculumService, NamespaceService } from '@eivo/api';
import fs from 'fs';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { load } from '../../../types/SpecLoader';
import { Pipeline } from '../../../types/Specs';
import { PipelineExecutor } from '../../executors/PipelineExecutor';

@SubCommand({ name: 'execute' })
export class ScriptExecCommand extends CommandRunner {
  constructor(
    private readonly namespaceService: NamespaceService,
    private readonly curriculumService: CurriculumService,
  ) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    if (input.length == 0) {
      console.log('invalid arguments.');
      return;
    }
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const pipelineName = input.at(1) ?? '';
    const specs = load(yamlString);
    let pipelineSpec;
    if (pipelineName) {
      pipelineSpec = specs.get(pipelineName);
      if (!pipelineSpec) {
        throw new Error(`Pipeline ${pipelineName} does not exist `);
      }
      if (!(pipelineSpec instanceof Pipeline)) {
        throw new Error(`${pipelineName} is not a pipeline `);
      }
    } else {
      pipelineSpec = [...specs.values()].find((p) => p instanceof Pipeline);
      if (!pipelineSpec) {
        throw new Error(`Not Pipeline present in the file.`);
      }
    }
    const res = await new PipelineExecutor().start(
      pipelineSpec,
      specs,
    );
    // const yaml_maker = yaml.dump(maker);
    // const yaml_schemas = yaml.dump(Array.from(schemas.values()));
    // fs.writeFileSync(input[1], yaml_schemas, 'utf8');
    // fs.writeFileSync(input[2], yaml_maker, 'utf8');
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
}
