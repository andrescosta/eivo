import {
  copyNamedObjectPropertiesToTranslations,
  Curriculum,
  CurriculumService,
  Queryable,
  Tenant,
  TenantService,
} from '@eivo/api';
import fs from 'fs';
import yaml from 'js-yaml';
import { CommandRunner, Option, SubCommand } from 'nest-commander';

@SubCommand({ name: 'add' })
export class AppLessonAddCommand extends CommandRunner {
  constructor(
    private readonly tenantService: TenantService,
    private readonly curriculumService: CurriculumService,
  ) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const tenant = yaml.load(yamlString) as Tenant;
    if (options['debug']) {
      console.log('=============================================');
      console.log('Application loaded from file:');
      console.log(JSON.stringify(tenant, null, 2));
    }
    copyNamedObjectPropertiesToTranslations(tenant);
    const tenantS = await this.tenantService.save(tenant);
    if (options['debug']) {
      console.log('=============================================');
      console.log(`Loading application ${tenantS.id} from DB.`);
      if (tenantS?.curriculums != null && tenantS.curriculums.length > 0) {
        const cv = await this.curriculumService.findFull(
          tenantS.id,
          tenantS.curriculums[0].id,
          'us',
        );
        console.log(yaml.dump(cv));
        const a = await this.curriculumService.findFullForSubject(
          tenantS.id,
          tenantS.curriculums[0].id,
          tenantS.curriculums[0].subjects[0].id,
          'us',
        );
        console.log(`Retrieved with subject ${tenantS.id} from DB.`);
        console.log('=============================================');
        console.log(JSON.stringify(a, null, 2));
        console.log('=============================================');
        console.log(yaml.dump(a));
        console.log('=============================================');

        const q: Queryable<Curriculum> = {
          id: tenantS.curriculums[0].id,
          tenant: {
            id: tenantS.id,
          },
          translations: {
            languageCode: 'us',
          },
        };

        const l = await this.curriculumService.find1(q);
        yaml.dump(l);
      }
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
