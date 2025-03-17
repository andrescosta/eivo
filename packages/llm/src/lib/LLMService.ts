// import { Exercise, Lesson } from '../../../../apps/data/src/entities/Lesson';
// import { glob, globSync, globStream, globStreamSync, Glob } from 'glob'
// import path from "path"

// export class LLMService {
//   public async GenerateExercises(
//     lesson: Lesson,
//     ex: Exercise,
//   ): Promise<Exercise[]> {
//     return [];
//   }
// }

// class Repl {
//   name!: string;
//   value!: string;
// }

// type Level = 'advanced' | 'initial';

// class GeneratorRegister {
//   generators!: Map<string, Generator>;
//   async gen(l: Lesson, ex: Exercise): Promise<Exercise[] | undefined> {
//     const g = this.getGenerator(ex);
//     return await g?.gen(l, ex);
//   }

//   getGenerator(ex: Exercise): Generator | undefined {
//     return this.generators.get(ex.kind + ex.theme + ex.type);
//   }
// }

// export abstract class Generator {
//   // abstract gen(l: Lesson, ex: Exercise): Promise<Exercise[]>;

//   getValue(s: string, r: Repl[]): string;
//   getValue(s: string): string {
//     return s;
//   }
//   getRepls(lesson: Lesson, ex: Exercise): Repl[] {
//     const repls = new Array<Repl>();
//     const level1 = lesson.prompt.level ?? ex.prompt.level ?? 'advanced';
//     repls.push(this.getRepl('req.level', level1));
//     repls.push(this.getRepl('req.qty', '10'));
//     return repls;
//   }

//   getRepl(n: string, v: string): Repl {
//     return { name: n, value: v };
//   }
// }

// class GeneratorLoader {
//   async load(gpath:string): Promise<Generator[]>{
    
//     const gens = new Array<Generator>();
//     const files = await glob(path.normalize(gpath), {
//       signal: AbortSignal.timeout(100),
//     })
    
//     return gens;
//   }
// }