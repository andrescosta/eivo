import { CurriculumService, NamespaceService } from '@eivo/api';
import fs from 'fs';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { load } from '../../../types/SpecLoader';
import { Modeler } from '../../../types/Specs';
import { ModelerExecutor } from '../../executors/ModelerExecutor';
import yaml from 'js-yaml';
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
    const specs = load(yamlString);

    const modelerName = input.at(2) ?? '';
    const modeler = modelerName
      ? specs.get(modelerName)
      : [...specs.values()].find((p) => p instanceof Modeler);
    if (!modeler && modelerName) {
      throw new Error(`Modeler ${modelerName} does not exist`);
    }
    if (!(modeler instanceof Modeler)) {
      throw new Error("Modeler not found.");
    }
    const res = await new ModelerExecutor().execute(modeler, specs);
    fs.writeFileSync(input[1], yaml.dump(res));
  }
  @Option({
    flags: '-d, --debug',
    description: 'Load and print.',
  })
  parseLoad(val: string) {
    return val;
  }
}
