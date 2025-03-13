import { CommandRunner, SubCommand } from 'nest-commander';
import yaml from 'js-yaml';
import fs from 'fs';
import { Application } from '../entities/Application';
import { ApplicationService } from '../applications/ApplicationService';

@SubCommand({ name: 'add' })
export class AppLessonAddCommand extends CommandRunner {
  constructor(private readonly svc:ApplicationService) {
    super();
  }
  async run(input: string[]) {
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const application = yaml.load(yamlString) as Application;
    const ret = await this.svc.create(application);
    console.log(ret);
    // console.log(yaml.dump(db));
  }
}
