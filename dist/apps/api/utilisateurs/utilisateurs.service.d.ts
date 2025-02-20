import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
export declare class UtilisateursService {
    create(createUtilisateurDto: CreateUtilisateurDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUtilisateurDto: UpdateUtilisateurDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=utilisateurs.service.d.ts.map