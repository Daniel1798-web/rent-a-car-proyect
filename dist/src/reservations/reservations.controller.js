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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let ReservationsController = class ReservationsController {
    reservationsService;
    constructor(reservationsService) {
        this.reservationsService = reservationsService;
    }
    async create(req, dto) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new common_1.BadRequestException("Token inválido: falta userId");
        }
        return this.reservationsService.createReservation(userId, dto);
    }
    async getMyReservations(req) {
        const userId = req.user?.sub;
        if (!userId) {
            throw new common_1.BadRequestException("Token inválido: falta userId");
        }
        return this.reservationsService.getMyReservations(userId);
    }
    async cancelReservation(req, reservationId) {
        const userId = req.user?.sub;
        if (!userId)
            throw new common_1.BadRequestException("Token inválido: falta userId");
        return this.reservationsService.cancelReservation(userId, reservationId);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Creá una reserva para el cliente autenticado" }),
    (0, swagger_1.ApiBody)({
        type: create_reservation_dto_1.CreateReservationDto,
        examples: {
            example1: {
                summary: "Reserva de auto ejemplo",
                value: {
                    carModelId: "modelID",
                    branchId: "branchID",
                    startDate: "2025-10-01",
                    endDate: "2025-10-05"
                }
            }
        }
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiOperation)({ summary: "Listá las reservas del cliente autenticado" }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "getMyReservations", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Cancelá una reserva del cliente si cumple las condiciones" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID de la reserva a cancelar",
        example: "123e4567-e89b-12d3-a456-426614174000"
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "cancelReservation", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)("Reservations"),
    (0, common_1.Controller)("reservations"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map