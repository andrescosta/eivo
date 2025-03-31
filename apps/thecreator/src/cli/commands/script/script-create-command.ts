import { CurriculumService, NamespaceService } from '@eivo/api';
import fs from 'fs';
import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Modeler, Spec } from '../../../types/Specs';
import { ModelerExecutor } from '../../executors/ModelerExecutor';
import yaml from 'js-yaml';
import { SpecFactory } from 'apps/thecreator/src/types/SpecFactory';
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
      console.error('invalid arguments.');
      return;
    }
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const specs = this.load(yamlString);

    const modelerName = input.at(2) ?? '';
    const modeler = modelerName
      ? specs.get(modelerName)
      : [...specs.values()].find((p) => p instanceof Modeler);
    if (!modeler && modelerName) {
      throw new Error(`Modeler ${modelerName} does not exist`);
    }
    if (!(modeler instanceof Modeler)) {
      throw new Error('Modeler not found.');
    }
    const systemPrompt = options['system'];
    const res = await new ModelerExecutor().execute(
      modeler,
      specs,
      systemPrompt,
    );
    fs.writeFileSync(input[1], yaml.dump(res));
  }
  @Option({
    flags: '-s, --system [spec name]',
    description: 'Spec name for System prompt.',
  })
  parseSystem(val: string) {
    return val;
  }

  load(specString: string): Map<string, Spec> {
    const specs = new Map<string, Spec>();
    yaml.loadAll(specString, (p) => {
      const spec = SpecFactory.build(p);
      specs.set(spec.metadata.name, spec);
    });
    return specs;
  }
}
