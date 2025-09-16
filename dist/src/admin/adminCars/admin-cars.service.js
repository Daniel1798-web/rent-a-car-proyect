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
exports.AdminCarsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AdminCarsService = class AdminCarsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.carModel.findUnique({
            where: {
                make_model: {
                    make: dto.make,
                    model: dto.model
                }
            }
        });
        if (existing) {
            throw new common_1.BadRequestException("Este modelo ya existe");
        }
        return this.prisma.carModel.create({ data: dto });
    }
    async update(id, dto) {
        const car = await this.prisma.carModel.findUnique({ where: { id } });
        if (!car)
            throw new common_1.NotFoundException("Modelo de auto no encontrado");
        if ((dto.make && dto.model) || dto.make || dto.model) {
            const make = dto.make ?? car.make;
            const model = dto.model ?? car.model;
            const conflict = await this.prisma.carModel.findFirst({
                where: { make, model, NOT: { id } }
            });
            if (conflict)
                throw new common_1.BadRequestException("Ya existe un modelo con esa combinación make+model");
        }
        return this.prisma.carModel.update({
            where: { id },
            data: dto
        });
    }
};
exports.AdminCarsService = AdminCarsService;
exports.AdminCarsService = AdminCarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminCarsService);
//# sourceMappingURL=admin-cars.service.js.map