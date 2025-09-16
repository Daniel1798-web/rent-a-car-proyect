import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class ReservationsService {

  private cancelLimitHours: number;


  constructor(private prisma: PrismaService) {
      this.cancelLimitHours = parseInt(process.env.CANCEL_LIMIT_HOURS || "0", 10);
  }

  async createReservation(userId: string, dto: CreateReservationDto) {
    const { carModelId, branchId, startDate, endDate } = dto;

    const inventory = await this.prisma.inventory.findUnique({
      where: {
        branchId_carModelId: { branchId, carModelId }
      }
    });

    if (!inventory || inventory.quantity <= 0) {
      throw new BadRequestException("No hay disponibilidad para este auto en esta sucursal.");
    }

    const overlapping = await this.prisma.reservation.findFirst({
      where: {
        carModelId,
        branchId,
        status: { not: "CANCELLED" },
        AND: [{ startDate: { lte: new Date(endDate) } }, { endDate: { gte: new Date(startDate) } }]
      }
    });

    if (overlapping) {
      throw new BadRequestException("El auto ya está reservado en esas fechas.");
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
      throw new BadRequestException("El modelo de auto no existe.");
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

  async getMyReservations(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: {
        carModel: true,
        branch: true
      }
    });
  }



  async cancelReservation(userId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId }
    });

    if (!reservation) {
      throw new BadRequestException("Reserva no encontrada.");
    }

    if (reservation.userId !== userId) {
      throw new BadRequestException("No podés cancelar esta reserva.");
    }

    const now = new Date();

    if (now >= reservation.startDate) {
      throw new BadRequestException("No podés cancelar una reserva iniciada.");
    }

    const diffHours = (reservation.startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (this.cancelLimitHours > 0 && diffHours < this.cancelLimitHours) {
      throw new BadRequestException(
        `Solo podés cancelar hasta ${this.cancelLimitHours} horas antes del inicio.`
      );
    }

    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: { status: "CANCELLED" }
    });
  }
}
