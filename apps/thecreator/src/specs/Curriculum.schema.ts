export interface Spec{
  kind: string;
}

export interface CurriculumSpec extends Spec{
  prompt: string;
  steps: Step[];
}

export interface Step {
  name: string;
  schema: Schema;
  instruction: Instruction;
}

export type Instruction = SimpleInstruction | ComposedInstruction;

export interface SimpleInstruction {
  prompt: string;
}
export interface ComposedInstruction {
  forEach: EachCommand;
}
export interface EachCommand {
  var: string;
  instruction: SimpleInstruction;
}

type Schema = Map<string, Record<string, string | number | object>>;
