Curriculum:
    prompt: You are a French teacher expert.
    Step 1- Each level will be a Subject:
        Prompt: what are the CEFR French Levels ? return them using the provided schema. (Level ID, main_characteristics). 
    Step 2- For each level, produce a list of Units:
        If you considering writing a book to teach level {level}, what should be the units ?
    Step 3- For each unit, produce a list of lessons:
        If you considering writing a book to teach level {level}, for the Unit {}, what lessons to teach ?
    Step 4- For each lesson, produce a list of material template:

    Step 5- For each lesson, produce a list of exercises template:
        If you considering writing a book to teach level {level}, for the Unit {}, for the Lesson {}, 
        Create exercises templates for exercises: ...

curriculum_generator:
    prompt: string
    steps: step_stype[]

step_type:
    name: string
    schema: schema_type
    instruction: instruction_type

instruction_type: prompt_type | composed_instruction_type

prompt_type:
    prompt: string

composed_instruction_type:
    for_each:step_type

step_type:
    var: string
    prompt: prompt_type
        


