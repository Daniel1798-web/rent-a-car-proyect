import { Test, TestingModule } from "@nestjs/testing";
import { ReservationsService } from "./reservations.service";
import { PrismaService } from "../../prisma/prisma.service";
import { BadRequestException } from "@nestjs/common";
import { Reservation } from "@prisma/client";

describe("ReservationsService", () => {
  let service: ReservationsService;
  let prisma: {
    inventory: { findUnique: jest.Mock };
    reservation: {
      findFirst: jest.Mock;
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
    };
    discount: { findFirst: jest.Mock };
    carModel: { findUnique: jest.Mock };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: {
            inventory: { findUnique: jest.fn() },
            reservation: {
              findFirst: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn()
            },
            discount: { findFirst: jest.fn() },
            carModel: { findUnique: jest.fn() }
          }
        }
      ]
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prisma = module.get(PrismaService);
  });

  describe("createReservation", () => {
    const dto = {
      carModelId: "car-1",
      branchId: "branch-1",
      startDate: "2025-09-20",
      endDate: "2025-09-22"
    };

    it("lanza error si no hay inventario", async () => {
      prisma.inventory.findUnique.mockResolvedValue(null);

      await expect(service.createReservation("user-1", dto)).rejects.toThrow(
        new BadRequestException("No hay disponibilidad para este auto en esta sucursal.")
      );
    });

    it("lanza error si hay reserva solapada", async () => {
      prisma.inventory.findUnique.mockResolvedValue({
        id: "inv-1",
        branchId: "branch-1",
        carModelId: "car-1",
        quantity: 1
      });
      prisma.reservation.findFirst.mockResolvedValue({ id: "res-1" } as any);

      await expect(service.createReservation("user-1", dto)).rejects.toThrow(
        new BadRequestException("El auto ya está reservado en esas fechas.")
      );
    });

    it("calcula el precio con descuento", async () => {
      prisma.inventory.findUnique.mockResolvedValue({
        id: "inv-1",
        branchId: "branch-1",
        carModelId: "car-1",
        quantity: 1
      });
      prisma.reservation.findFirst.mockResolvedValue(null);
      prisma.discount.findFirst.mockResolvedValue({ id: "disc-1", percentage: 20 } as any);
      prisma.carModel.findUnique.mockResolvedValue({ id: "car-1", dailyRate: 100 } as any);
      prisma.reservation.create.mockResolvedValue({ id: "res-1", totalPrice: 160 } as any);

      const result = await service.createReservation("user-1", dto);

      expect(result.totalPrice).toBe(160);
      expect(prisma.reservation.create).toHaveBeenCalled();
    });
  });

  describe("cancelReservation", () => {
    it("lanza error si la reserva no existe", async () => {
      prisma.reservation.findUnique.mockResolvedValue(null);

      await expect(service.cancelReservation("user-1", "res-1")).rejects.toThrow(
        new BadRequestException("Reserva no encontrada.")
      );
    });

    it("lanza error si la reserva pertenece a otro usuario", async () => {
      prisma.reservation.findUnique.mockResolvedValue({
        id: "res-1",
        userId: "other-user",
        startDate: new Date("2025-09-20")
      } as any);

      await expect(service.cancelReservation("user-1", "res-1")).rejects.toThrow(
        new BadRequestException("No podés cancelar esta reserva.")
      );
    });

    it("cancela correctamente una reserva futura del mismo usuario", async () => {
      const reservation: Partial<Reservation> = {
        id: "res-1",
        userId: "user-1",
        carModelId: "car-1",
        branchId: "branch-1",
        startDate: new Date("2025-12-01"),
        endDate: new Date("2025-12-05"),
        totalPrice: 500,
        status: "CONFIRMED"
      };

      prisma.reservation.findUnique.mockResolvedValue(reservation as Reservation);
      prisma.reservation.update.mockResolvedValue({ ...reservation, status: "CANCELLED" } as Reservation);

      const result = await service.cancelReservation("user-1", "res-1");

      expect(result.status).toBe("CANCELLED");
      expect(prisma.reservation.update).toHaveBeenCalled();
    });
  });
});
