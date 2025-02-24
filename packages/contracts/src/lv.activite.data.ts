import { LvApplication } from "./lv.application.data";
import { LvClasse as LvClasse } from "./lv.classe.data";

export class LvActivite {
    id!: string;
    application!: LvApplication;
    classe!: LvClasse;
}