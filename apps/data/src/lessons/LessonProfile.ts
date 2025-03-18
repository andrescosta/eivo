// import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
// import { createMap, type Mapper } from '@automapper/core';
// import { Injectable } from '@nestjs/common';
// import { Application } from '../entities/Application';
// import { LvApplication } from '@lingv/contracts';

// @Injectable()
// export class ApplicationProfile extends AutomapperProfile {
//     constructor(@InjectMapper() mapper: Mapper) {
//         super(mapper);
//     }

//     override get profile() {
//         return (mapper: Mapper) => {
//             createMap(mapper, Application, LvApplication);
//         };
//     }
// }
