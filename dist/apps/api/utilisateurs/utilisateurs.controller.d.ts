import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
export declare class UtilisateursController {
    private readonly utilisateursService;
    constructor(utilisateursService: UtilisateursService);
    create(createUtilisateurDto: CreateUtilisateurDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUtilisateurDto: UpdateUtilisateurDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=utilisateurs.controller.d.ts.map