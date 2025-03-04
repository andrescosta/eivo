import { LvDomain } from "./LvDomain";
import { LvTopic } from "./LvTopic";

export class LvClass {
    id!:string;
    name!:string;
    description?:string;
    domain?:LvDomain;
    topics?:LvTopic[];
}