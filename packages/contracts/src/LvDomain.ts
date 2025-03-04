import { LvTenant } from "./LvTenant";
import { LvTopic } from "./LvTopic";

export class LvDomain {
    public id?: string;
    public name!: string;
    public description?: string;
    public tenant?: LvTenant;
    public topics?: LvTopic[];
    public type?: string;
}