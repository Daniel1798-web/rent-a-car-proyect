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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReservationsService = class ReservationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReservation(userId, dto) {
        const { carModelId, branchId, startDate, endDate } = dto;
        const inventory = await this.prisma.inventory.findUnique({
            where: {
                branchId_carModelId: { branchId, carModelId }
            }
        });
        if (!inventory || inventory.quantity <= 0) {
            throw new common_1.BadRequestException("No hay disponibilidad para este auto en esta sucursal.");
        }
        const overlapping = await this.prisma.reservation.findFirst({
            where: {
                carModelId,
                branchId,
                startDate: { lte: new Date(endDate) },
                endDate: { gte: new Date(startDate) }
            }
        });
        if (overlapping) {
            throw new common_1.BadRequestException("El auto ya está reservado en esas fechas.");
        }
        const bestDiscount = await this.prisma.discount.findFirst({
            where: {
                userId,
                validTo: { gte: new Date() },
                active: true
            },
            orderBy: { percentage: "desc" }
        });
        const carModel = await this.prisma.carModel.findUnique({
            where: { id: carModelId }
        });
        if (!carModel) {
            throw new common_1.BadRequestException("El modelo de auto no existe.");
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        let totalPrice = days * carModel.dailyRate;
        if (bestDiscount) {
            totalPrice = totalPrice - (totalPrice * bestDiscount.percentage) / 100;
        }
        const reservation = await this.prisma.reservation.create({
            data: {
                carModelId,
                branchId,
                userId,
                startDate: start,
                endDate: end,
                discountId: bestDiscount?.id,
                totalPrice
            }
        });
        return reservation;
    }
    async getMyReservations(userId) {
        return this.prisma.reservation.findMany({
            where: { userId },
            include: {
                carModel: true,
                branch: true
            }
        });
    }
    async cancelReservation(userId, reservationId) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id: reservationId }
        });
        if (!reservation) {
            throw new common_1.BadRequestException("Reserva no encontrada.");
        }
        if (reservation.userId !== userId) {
            throw new common_1.BadRequestException("No podés cancelar esta reserva.");
        }
        if (new Date() >= reservation.startDate) {
            throw new common_1.BadRequestException("No podés cancelar una reserva iniciada.");
        }
        return this.prisma.reservation.update({
            where: { id: reservationId },
            data: { status: "CANCELLED" }
        });
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map