import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { ExerciseTemplate } from '../entities/ExerciseTemplate';
import { dezerialize } from 'zodex';
import { Lesson } from '../entities/Lesson';
import { render } from 'mustache';
import { VV } from '../exercises/ExerciseController';

export type model = 'google_gemini';

export async function generate(
  e: ExerciseTemplate,
  vv: VV,
  m?: model,
): Promise<Lesson> {
  var o: { [k: string]: any } = {};
  o.req = {
    level: 'advanced',
    qty: '10',
  };
  o.variations = {};
  Object.keys(vv.variations).forEach((p) => {
    o.variations[p] = vv.variations[p];
  });

  const ps = render(e.lesson.prompt.prompt ?? '', o);
  const p = render(e.prompt.prompt ?? '', o);

  const mod = google('gemini-1.5-flash');
  const ds = JSON.parse(JSON.stringify(e.lesson.application.schema, null, 2));
  const schema = dezerialize(ds);
  const { object } = await generateObject({
    model: mod,
    system: ps,
    prompt: p,
    schema: schema,
  });
  return new Lesson(object['exercises']);
}
