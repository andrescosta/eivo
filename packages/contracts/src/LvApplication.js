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
exports.LvApplicationType = exports.LvApplication = void 0;
const swagger_1 = require("@nestjs/swagger");
class LvApplication {
    id;
    name;
    description;
    smallImage;
    bigImage;
    topics;
    type;
}
exports.LvApplication = LvApplication;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '136ade9c5-790b-4df6-b975-68ca82cd269e',
        description: 'ID',
    }),
    __metadata("design:type", String)
], LvApplication.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cross Word', description: 'Name' }),
    __metadata("design:type", String)
], LvApplication.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cross Word ....', description: 'Description' }),
    __metadata("design:type", String)
], LvApplication.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn/img_s.jpg', description: 'Small image' }),
    __metadata("design:type", String)
], LvApplication.prototype, "smallImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn/img_b.jpg', description: 'Large Image' }),
    __metadata("design:type", String)
], LvApplication.prototype, "bigImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Topic' }),
    __metadata("design:type", Array)
], LvApplication.prototype, "topics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IA', description: 'Type' }),
    __metadata("design:type", String)
], LvApplication.prototype, "type", void 0);
var LvApplicationType;
(function (LvApplicationType) {
    LvApplicationType["Human"] = "Human";
    LvApplicationType["IA"] = "IA";
})(LvApplicationType || (exports.LvApplicationType = LvApplicationType = {}));
//# sourceMappingURL=LvApplication.js.map