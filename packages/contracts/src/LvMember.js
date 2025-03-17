"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LvRole = exports.LvMember = void 0;
const swagger_1 = require("@nestjs/swagger");
const LvClass_1 = require("./LvClass");
const LvUser_1 = require("./LvUser");
class LvMember {
    id;
    user;
    myclass;
    role;
}
exports.LvMember = LvMember;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
        description: 'ID',
    }),
    __metadata("design:type", String)
], LvMember.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User' }),
    __metadata("design:type", LvUser_1.LvUser)
], LvMember.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Class' }),
    __metadata("design:type", LvClass_1.LvClass)
], LvMember.prototype, "myclass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'STUDENT', description: 'Role' }),
    __metadata("design:type", String)
], LvMember.prototype, "role", void 0);
var LvRole;
(function (LvRole) {
    LvRole["STUDENT"] = "STUDENT";
    LvRole["TEACHER"] = "TEACHER";
    LvRole["ADMIN"] = "ADMIN";
})(LvRole || (exports.LvRole = LvRole = {}));
//# sourceMappingURL=LvMember.js.map