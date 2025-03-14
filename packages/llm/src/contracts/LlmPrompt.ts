import { z } from 'zod';

export interface LlmPrompt {
    system: string;
    prompt: string;
    schema: z.Schema;
  }
  