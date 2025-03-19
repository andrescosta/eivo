import { generateObject, LanguageModel } from 'ai';
import { google } from '@ai-sdk/google';
import { ExerciseTemplate } from '../entities/ExerciseTemplate.entity';
import { dezerialize } from 'zodex';
import { Lesson } from '../entities/Lesson.entity';
import { render } from 'mustache';
import { LvVarions } from '@lingv/contracts';

export type model = 'google_gemini' | 'openapi';
export type level = 'advanced';
type params = { [k: string]: any };

export async function generate(
  e: ExerciseTemplate,
  varios: LvVarions,
  m?: model,
  lvl?: level,
  qty?: number,
): Promise<Lesson> {
  var thisparams:params  = {};
  thisparams.req = {
    level: lvl ?? 'advanced',
    qty: qty ?? '10',
  };
  thisparams.variations = {};
  Object.keys(varios.variations).forEach((p) => {
    thisparams.variations[p] = varios.variations[p];
  });

  const ps = render(e.lesson.prompt.prompt ?? '', thisparams);
  const p = render(e.prompt.prompt ?? '', thisparams);

  const mod = getLanguageModel(m);
  const ds = JSON.parse(JSON.stringify(e.lesson.application.schemas.get(e.schema), null, 2));
  const schema = dezerialize(ds);
  const { object } = await generateObject({
    model: mod,
    system: ps,
    prompt: p,
    schema: schema,
  });
  return new Lesson(object['exercises']);
}

function getLanguageModel(mdl?: model):LanguageModel{
  switch (mdl) {
    case 'google_gemini':
      return google('gemini-1.5-flash');
    default:
      return google('gemini-1.5-flash');
  }

}