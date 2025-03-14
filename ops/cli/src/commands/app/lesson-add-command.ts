import { CommandRunner, Option, SubCommand } from 'nest-commander';
import yaml from 'js-yaml';
import fs from 'fs';
import { Application } from '@lingv/data';
import { ApplicationService } from '@lingv/data';

@SubCommand({ name: 'add' })
export class AppLessonAddCommand extends CommandRunner {
  constructor(private readonly svc: ApplicationService) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const application = yaml.load(yamlString) as Application;
    // application.lessons?.forEach((p) => {
    //   p.application = application;
    //   p.exercises.forEach((e) => (e.lesson = p));
    // });
    const app = await this.svc.create(application);
    if (options['yaml'] != null) {
      console.log(yaml.dump(app));
    }
  }

  @Option({
    flags: '-y, --yaml',
    description: 'Dump yaml.',
  })
  parseYAML(val: string) {
    return val;
  }
}
