import {
  copyNamedObjectPropertiesToTranslations,
  Curriculum,
  CurriculumService,
  Queryable,
  EivoNamespace,
  EivoNamespaceService,
} from '@eivo/api';
import fs from 'fs';
import yaml from 'js-yaml';
import { CommandRunner, Option, SubCommand } from 'nest-commander';

@SubCommand({ name: 'add' })
export class AppLessonAddCommand extends CommandRunner {
  constructor(
    private readonly namespaceService: EivoNamespaceService,
    private readonly curriculumService: CurriculumService,
  ) {
    super();
  }
  async run(input: string[], options: Record<string, string>) {
    const yamlString = fs.readFileSync(input[0], 'utf8');
    const eivonamespace = yaml.load(yamlString) as EivoNamespace;
    if (options['debug']) {
      console.log('=============================================');
      console.log('Application loaded from file:');
      console.log(JSON.stringify(eivonamespace, null, 2));
    }
    copyNamedObjectPropertiesToTranslations(eivonamespace);
    const namespaceS = await this.namespaceService.save(eivonamespace);
    if (options['debug']) {
      console.log('=============================================');
      console.log(`Loading application ${namespaceS.id} from DB.`);
      if (namespaceS?.curriculums != null && namespaceS.curriculums.length > 0) {
        const cv = await this.curriculumService.findFull(
          namespaceS.id,
          namespaceS.curriculums[0].id,
          'us',
        );
        console.log(yaml.dump(cv));
        const a = await this.curriculumService.findFullForSubject(
          namespaceS.id,
          namespaceS.curriculums[0].id,
          namespaceS.curriculums[0].syllabuses[0].id,
          'us',
        );
        console.log(`Retrieved with subject ${namespaceS.id} from DB.`);
        console.log('=============================================');
        console.log(JSON.stringify(a, null, 2));
        console.log('=============================================');
        console.log(yaml.dump(a));
        console.log('=============================================');

        // const q: Queryable<Curriculum> = {
        //   id: namespaceS.curriculums[0].id,
        //   namespace: {
        //     id: namespaceS.id,
        //   },
        //   // translations: {
        //   //   : 'us',
        //   // },
        // };

        // //const l = await this.curriculumService.find1(q);
        // //yaml.dump(l);
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
