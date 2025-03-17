import { LvClass } from './LvClass';
import { LvUser } from './LvUser';
export declare class LvMember {
    id: string;
    user: LvUser;
    myclass: LvClass;
    role: LvRole;
}
export declare enum LvRole {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}
//# sourceMappingURL=LvMember.d.ts.map