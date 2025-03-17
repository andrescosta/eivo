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
exports.LvArchiveEntry = void 0;
const swagger_1 = require("@nestjs/swagger");
const LvMember_1 = require("./LvMember");
class LvArchiveEntry {
    id;
    date;
    member;
}
exports.LvArchiveEntry = LvArchiveEntry;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
        description: 'ID',
    }),
    __metadata("design:type", Number)
], LvArchiveEntry.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '01/01/2001', description: 'Activiti date' }),
    __metadata("design:type", Date)
], LvArchiveEntry.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Member' }),
    __metadata("design:type", LvMember_1.LvMember)
], LvArchiveEntry.prototype, "member", void 0);
//# sourceMappingURL=LvArchiveEntry.js.map