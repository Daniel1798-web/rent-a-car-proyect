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
exports.AdminDiscountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AdminDiscountsService = class AdminDiscountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        let user = null;
        if (dto.userId) {
            user = await this.prisma.user.findUnique({
                where: { id: dto.userId }
            });
            if (!user) {
                throw new common_1.BadRequestException("Usuario no encontrado");
            }
        }
        const validFrom = dto.startDate ? new Date(dto.startDate) : new Date();
        const validTo = dto.endDate ? new Date(dto.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return this.prisma.discount.create({
            data: {
                code: dto.code,
                percentage: dto.percentage,
                userId: dto.userId ?? null,
                validFrom,
                validTo,
                active: true
            }
        });
    }
};
exports.AdminDiscountsService = AdminDiscountsService;
exports.AdminDiscountsService = AdminDiscountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminDiscountsService);
//# sourceMappingURL=admin-discounts.service.js.map