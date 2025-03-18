import { CommandRunner, Option, SubCommand } from 'nest-commander';
import yaml from 'js-yaml';
import fs from 'fs';
// import { Application } from '@lingv/data/entities/Application';
// import { ApplicationService } from '@lingv/data/applications/ApplicationService';
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
    if (options['debug']) {
      console.log('=============================================');
      console.log('Application loaded from file:');
      console.log(JSON.stringify(application, null, 2));
    }
    const app = await this.svc.create(application);
    if (options['debug']) {
      console.log('=============================================');
      console.log(`Loading application ${app.id} from DB.`);
      const a = await this.svc.findWithLessonsExercises(app.id);
      console.log(`Retrieved application ${app.id} from DB.`);
      console.log('=============================================');
      console.log(JSON.stringify(a, null, 2));
      console.log('=============================================');
      console.log(yaml.dump(a));
      console.log('=============================================');
    }
  }

  @Option({
    flags: '-d, --debug',
    description: 'Load and print.',
  })
  parseLoad(val: string) {
    return val;
  }
}
