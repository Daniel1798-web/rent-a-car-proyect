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
exports.AdminReservationsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../../auth/roles/roles.guard");
const roles_decorator_1 = require("../../auth/roles/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let AdminReservationsController = class AdminReservationsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.reservation.findMany({
            include: {
                user: true,
                carModel: true,
                branch: true,
                discount: true
            },
            orderBy: { createdAt: "desc" }
        });
    }
};
exports.AdminReservationsController = AdminReservationsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("employee"),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiOperation)({ summary: "Listá todas las reservas" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminReservationsController.prototype, "findAll", null);
exports.AdminReservationsController = AdminReservationsController = __decorate([
    (0, swagger_1.ApiTags)("Admin Reservations"),
    (0, common_1.Controller)("admin/reservations"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminReservationsController);
//# sourceMappingURL=admin-reservations.controller.js.map