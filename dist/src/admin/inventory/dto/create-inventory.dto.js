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
exports.CreateInventoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInventoryDto {
    branchId;
    carModelId;
    quantity;
}
exports.CreateInventoryDto = CreateInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2bdeaa61-95fc-4751-a18b-43489269691e",
        description: "UUID de la sucursal"
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "branchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "af713e85-d77b-4d0e-8f98-3b35fa84d132",
        description: "UUID del modelo de auto"
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "carModelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: "Cantidad de autos disponibles en inventario"
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInventoryDto.prototype, "quantity", void 0);
//# sourceMappingURL=create-inventory.dto.js.map