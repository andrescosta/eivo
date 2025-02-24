import { Application } from "./application.entity";
import { Classe as Classe } from "./classe.entity";

export class Activite {
    id!: string;
    application!: Application;
    classe!: Classe;
}