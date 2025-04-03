// import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
// import { createMap, type Mapper } from '@automapper/core';
// import { Injectable } from '@nestjs/common';
// import { LearningTemplate } from '../../entities/Application.entity';
// import { LvApplication } from '@eivo/contracts';

// @Injectable()
// export class ApplicationProfile extends AutomapperProfile {
//   constructor(@InjectMapper() mapper: Mapper) {
//     super(mapper);
//   }

//   override get profile() {
//     return (mapper: Mapper) => {
//       createMap(mapper, LearningTemplate, LvApplication);
//       createMap(mapper, LvApplication, LearningTemplate);
//     };
//   }
// }
