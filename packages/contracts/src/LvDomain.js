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
exports.LvDomain = void 0;
const swagger_1 = require("@nestjs/swagger");
const LvTenant_1 = require("./LvTenant");
class LvDomain {
    id;
    name;
    description;
    tenant;
    topics;
    type;
}
exports.LvDomain = LvDomain;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
        description: 'ID',
    }),
    __metadata("design:type", String)
], LvDomain.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'English', description: 'Name' }),
    __metadata("design:type", String)
], LvDomain.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'English ...', description: 'Description' }),
    __metadata("design:type", String)
], LvDomain.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tenant' }),
    __metadata("design:type", LvTenant_1.LvTenant)
], LvDomain.prototype, "tenant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Topics' }),
    __metadata("design:type", Array)
], LvDomain.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TBD', description: 'Type' }),
    __metadata("design:type", String)
], LvDomain.prototype, "type", void 0);
//# sourceMappingURL=LvDomain.js.map