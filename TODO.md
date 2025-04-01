- Thecreator will be stateless, NO DB.
- Thecreator will be a service reading all spec files from a local dir.
- Provide API to genetate objects
- The course modeler will generate only descriptions with context information.
- New modeler for generating exercises... how ? If it depends on information generated previously:
  - Supporting passing context parameters to the API


https://thecreator/

Req:
POST
{
  name: <string>
  context?:<object>
  model: google|openai
}

Response:
YAML