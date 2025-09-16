import { Test, TestingModule } from "@nestjs/testing";
import { AdminReservationsController } from "./admin-reservations.controller";
import { PrismaService } from "../../../prisma/prisma.service";

describe("AdminReservationsController", () => {
  let controller: AdminReservationsController;
  let prisma: { reservation: { findMany: jest.Mock } };

  beforeEach(async () => {
    prisma = { reservation: { findMany: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminReservationsController],
      providers: [{ provide: PrismaService, useValue: prisma }]
    }).compile();

    controller = module.get<AdminReservationsController>(AdminReservationsController);
  });

  describe("findAll", () => {
    it("devuelve todas las reservas", async () => {
      const mockReservations = [
        { id: "res-1", userId: "user-1" },
        { id: "res-2", userId: "user-2" }
      ];
      prisma.reservation.findMany.mockResolvedValue(mockReservations);

      const result = await controller.findAll();
      expect(result).toEqual(mockReservations);
      expect(prisma.reservation.findMany).toHaveBeenCalledWith({
        include: {
          user: true,
          carModel: true,
          branch: true,
          discount: true
        },
        orderBy: { createdAt: "desc" }
      });
    });
  });
});
