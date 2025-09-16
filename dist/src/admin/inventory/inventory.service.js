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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let InventoryService = class InventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertInventory(dto) {
        const { branchId, carModelId, quantity } = dto;
        const branch = await this.prisma.branch.findUnique({ where: { id: branchId } });
        if (!branch)
            throw new common_1.BadRequestException("Sucursal no encontrada.");
        const car = await this.prisma.carModel.findUnique({ where: { id: carModelId } });
        if (!car)
            throw new common_1.BadRequestException("Modelo de auto no encontrado.");
        return this.prisma.inventory.upsert({
            where: { branchId_carModelId: { branchId, carModelId } },
            update: { quantity },
            create: { branchId, carModelId, quantity }
        });
    }
    async checkAvailability(filters) {
        const { branchId } = filters;
        const cars = await this.prisma.carModel.findMany({
            include: {
                inventory: branchId ? { where: { branchId } } : true
            }
        });
        return cars.map((car) => {
            const total = car.inventory.reduce((sum, inv) => sum + inv.quantity, 0);
            return {
                ...car,
                availableQuantity: total,
                isAvailable: total > 0
            };
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map