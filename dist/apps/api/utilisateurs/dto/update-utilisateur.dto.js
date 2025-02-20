"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUtilisateurDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_utilisateur_dto_1 = require("./create-utilisateur.dto");
class UpdateUtilisateurDto extends (0, mapped_types_1.PartialType)(create_utilisateur_dto_1.CreateUtilisateurDto) {
}
exports.UpdateUtilisateurDto = UpdateUtilisateurDto;
//# sourceMappingURL=update-utilisateur.dto.js.map