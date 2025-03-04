import { LvActivity } from "./LvActivity";
import { LvMember } from "./LvMember";

export class LvGame {
    id!: string;
    name!: string;
    description?: string;
    members!: LvMember[];
    date!: Date;
    activity!: LvActivity;
}