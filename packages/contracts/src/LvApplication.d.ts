import { LvTopic } from './LvTopic';
export declare class LvApplication {
    id: string;
    name: string;
    description: string;
    smallImage: string;
    bigImage: string;
    topics: LvTopic[];
    type: LvApplicationType;
}
export declare enum LvApplicationType {
    Human = "Human",
    IA = "IA"
}
//# sourceMappingURL=LvApplication.d.ts.map