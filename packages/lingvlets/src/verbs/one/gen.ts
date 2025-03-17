import { LlmPrompt } from '@lingv/llm';
import { generate } from '@lingv/llm';

export class Gen {
  async run(p: LlmPrompt): Promise<any> {
    p.schema
    return generate(p);
  }
}
