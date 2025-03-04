import { LvTenant } from "./LvTenant";

export class LvTopic {
    public id?: string;
    public description!: string; 
    public tenant!: LvTenant; 
}