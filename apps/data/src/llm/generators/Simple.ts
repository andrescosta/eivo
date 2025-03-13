import { Exercise, Lesson } from "../../entities/Lesson";
import { Generator } from "../LLMService";
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { generateObject } from 'ai';

class Simple extends Generator {
    async gen(lesson: Lesson, ex: Exercise): Promise<Exercise[]> {
      const repls = this.getRepls(lesson, ex);
      const system = this.getValue(lesson.prompt.system, repls);
      const prompt = this.getValue(ex.prompt.system, repls);
      const { object } = await generateObject({
        model: google('gemini-1.5-flash'),
        system: system,
        prompt: prompt,
        schema: z.object({
          notifications: z.array(
            z.object({
              phrase: z.string().describe('Phrase with the verbe to complete.'),
              solution: z.string().describe('Solution.'),
              verb: z.string().describe('Verbe in the infinitve.'),
            }),
          ),
        }),
      });
      return [];
    }
  }
  