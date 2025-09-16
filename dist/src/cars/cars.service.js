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
exports.CarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CarsService = class CarsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllWithAvailability(params) {
        const { branchId, startDate, endDate } = params;
        const cars = await this.prisma.carModel.findMany({
            orderBy: [{ make: "asc" }, { model: "asc" }],
            include: { inventory: true }
        });
        let start;
        let end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
                throw new common_1.BadRequestException("Fechas inválidas o startDate > endDate");
            }
        }
        const results = [];
        for (const car of cars) {
            let inventoryQty = 0;
            let inventoryForBranch = null;
            if (branchId) {
                const inv = car.inventory.find((i) => i.branchId === branchId);
                inventoryQty = inv ? inv.quantity : 0;
                inventoryForBranch = inv ? { branchId: inv.branchId, quantity: inv.quantity } : null;
            }
            else {
                inventoryQty = car.inventory.reduce((s, i) => s + (i.quantity ?? 0), 0);
            }
            if (!start || !end) {
                results.push({
                    ...car,
                    availableQuantity: inventoryQty,
                    isAvailable: inventoryQty > 0,
                    inventoryForBranch
                });
                continue;
            }
            const reservedCount = await this.prisma.reservation.count({
                where: {
                    carModelId: car.id,
                    ...(branchId ? { branchId } : {}),
                    status: { not: "CANCELLED" },
                    AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }]
                }
            });
            const availableQuantity = inventoryQty - reservedCount;
            results.push({
                ...car,
                availableQuantity: availableQuantity > 0 ? availableQuantity : 0,
                isAvailable: availableQuantity > 0,
                inventoryForBranch
            });
        }
        return results;
    }
    async findById(id) {
        const car = await this.prisma.carModel.findUnique({
            where: { id },
            include: {
                inventory: { include: { branch: true } }
            }
        });
        if (!car) {
            throw new common_1.NotFoundException("Vehículo no encontrado");
        }
        return car;
    }
};
exports.CarsService = CarsService;
exports.CarsService = CarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarsService);
//# sourceMappingURL=cars.service.js.map