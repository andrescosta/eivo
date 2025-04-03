- The course modeler will generate only descriptions with context information.
- New modeler for generating exercises... how ? If it depends on information generated previously:
  - Supporting passing context parameters to the API <done>

ID:


API:
/users: (redirect_ui handler): create a user if does not exist.
/get cultures
/get curriculums by culture
/get syllabuses by curriculum, culture and namespace
/get units by syllabus, culture and namespace
/get lessons by unit, culture and namespace
/get materials by lesson, culture and namespace ---|---> LLM Generation and 
/get exercies by lesson, culture and namespace  ---|     cache support.

/get|post course 
/get|post member (preferred culture, email, etc.)
/get|post activities

https://github.com/typeorm/typeorm/issues/9719
https://www.npmjs.com/package/tsid-ts