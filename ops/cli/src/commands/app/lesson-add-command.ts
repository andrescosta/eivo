import {
  Curriculum,
  CurriculumService,
  CurriculumTranslation,
  Tenant,
  TenantService,
  Translation,
  Subject,
  SubjectTranslation,
  TenantTranslation,
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
    // if (options['debug']) {
    //   console.log('=============================================');
    //   console.log('Application loaded from file:');
    //   console.log(JSON.stringify(tenant, null, 2));
    // }
    if (tenant.description != null) {
      tenant.translations = [];
      const st = new TenantTranslation();
      //st.base = tenant.curriculums[0];
      st.description = {
        long: tenant.description.long ?? '',
        short: tenant.description.short ?? '',
      };
      st.name = tenant.name as string;
      st.languageCode = 'us';
      tenant.translations.push(st);
    }
    if (tenant.curriculums[0].description != null) {
      tenant.curriculums[0].translations = new Array<Translation<Curriculum>>();
      const st = new CurriculumTranslation();
      //st.base = tenant.curriculums[0];
      st.description = {
        long: tenant.curriculums[0].description.long ?? '',
        short: tenant.curriculums[0].description.short ?? '',
      };
      st.name = tenant.curriculums[0].name as string;
      st.languageCode = 'us';
      tenant.curriculums[0].translations.push(st);
    }
    if (tenant.curriculums[0].subjects[0].description != null) {
      tenant.curriculums[0].subjects[0].translations = new Array<
        Translation<Subject>
      >();
      const st = new SubjectTranslation();
      //st.base = tenant.curriculums[0].subjects[0];
      st.description = {
        long: tenant.curriculums[0].subjects[0].description.long ?? '',
        short: tenant.curriculums[0].subjects[0].description.short ?? '',
      };
      st.languageCode = 'us';
      tenant.curriculums[0].subjects[0].translations.push(st);
    }
    // tenant.curriculums = [];
    // tenant.courses = [];
    // tenant.schemas = [];
    // tenant.translations =[];
    // tenant.users = [];
    // const t = new Tenant();
    // t.translations = new Array<TenantTranslation>();
    // const tt = new TenantTranslation();
    // tt.description = {
    //   long: "long",
    //   short: "short"
    // };
    // tt.languageCode = "us";
    // tt.name = "name";
    // t.translations.push(tt)
    // const c = new Curriculum();
    // const ct = new CurriculumTranslation();
    // ct.description = {
    //   long: "long",
    //   short: "short"
    // };
    // ct.languageCode = "us";
    // ct.name = "name";
    // c.translations = [];
    // c.translations.push(ct);
    // t.curriculums = new Array<Curriculum>();
    // t.curriculums.push(c);

    // c.tenant = t;
    // t.description = {
    //   long: ""  as LocaleString,
    //   short: ""  as LocaleString
    // }
    // const tenantS1 = await this.tenantService.save(t);

    // console.log(tenantS1.id);
    const tenantS = await this.tenantService.save(tenant);
    if (options['debug']) {
      console.log('=============================================');
      console.log(`Loading application ${tenantS.id} from DB.`);
      if (tenantS?.curriculums != null && tenantS.curriculums.length > 0) {
        const cv = await this.curriculumService.findComplete(
          tenantS.curriculums[0].id,
          'us',
          tenantS.id,
        );
        console.log(yaml.dump(cv));
        //const a = await this.svc.findWithLessonsExercises(app.id);
        console.log(`Retrieved application ${tenantS.id} from DB.`);
        console.log('=============================================');
        // console.log(JSON.stringify(a, null, 2));
        console.log('=============================================');
        // console.log(yaml.dump(a));
        console.log('=============================================');
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
