import { generateObject, LanguageModel } from 'ai';
import { LlmPrompt } from '../../contracts/LlmPrompt';
import { google } from '@ai-sdk/google';

export type model = "google_gemini"; 

export async function generate(p: LlmPrompt, m:model): Promise<any>;
export async function generate(p: LlmPrompt): Promise<any> {
  const mod = google('gemini-1.5-flash'); 
  const { object } = await generateObject({
    model: mod,
    system: p.system,
    prompt: p.prompt,
    schema: p.schema,
  });
  return object;
}
