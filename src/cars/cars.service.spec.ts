import { Test, TestingModule } from "@nestjs/testing";
import { CarsService } from "./cars.service";
import { PrismaService } from "../../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CarModel, Inventory } from "@prisma/client";

describe("CarsService", () => {
  let service: CarsService;
  let prisma: {
    carModel: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
    };
    reservation: {
      count: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      carModel: { findMany: jest.fn(), findUnique: jest.fn() },
      reservation: { count: jest.fn() }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService, { provide: PrismaService, useValue: prisma }]
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  describe("findAllWithAvailability", () => {
    const mockCar: CarModel & { inventory: Inventory[] } = {
      id: "car-1",
      make: "Toyota",
      model: "Corolla",
      seats: 5,
      dailyRate: 100,
      inventory: [{ id: "inv-1", branchId: "branch-1", carModelId: "car-1", quantity: 10 }]
    };

    it("devuelve disponibilidad sin fechas", async () => {
      prisma.carModel.findMany.mockResolvedValue([mockCar]);

      const result = await service.findAllWithAvailability({});
      expect(result[0].availableQuantity).toBe(10);
      expect(result[0].isAvailable).toBe(true);
      expect(result[0].inventoryForBranch).toBeNull();
    });

    it("devuelve disponibilidad con branchId", async () => {
      prisma.carModel.findMany.mockResolvedValue([mockCar]);

      const result = await service.findAllWithAvailability({ branchId: "branch-1" });
      expect(result[0].availableQuantity).toBe(10);
      expect(result[0].inventoryForBranch).toEqual({ branchId: "branch-1", quantity: 10 });
    });

    it("lanza error si fechas inválidas", async () => {
      await expect(service.findAllWithAvailability({ startDate: "2025-09-20", endDate: "2025-09-19" })).rejects.toThrow(
        BadRequestException
      );
    });

    it("calcula disponibilidad considerando reservas", async () => {
      prisma.carModel.findMany.mockResolvedValue([mockCar]);
      prisma.reservation.count.mockResolvedValue(3); // 3 autos reservados

      const result = await service.findAllWithAvailability({
        startDate: "2025-09-20",
        endDate: "2025-09-22"
      });

      expect(result[0].availableQuantity).toBe(7);
      expect(result[0].isAvailable).toBe(true);
    });
  });

  describe("findById", () => {
    it("devuelve el auto si existe", async () => {
      const mockCar = {
        id: "car-1",
        make: "Toyota",
        model: "Corolla",
        seats: 5,
        dailyRate: 100,
        inventory: [],
        reservations: []
      };
      prisma.carModel.findUnique.mockResolvedValue(mockCar);

      const result = await service.findById("car-1");
      expect(result).toEqual(mockCar);
    });

    it("lanza NotFoundException si no existe", async () => {
      prisma.carModel.findUnique.mockResolvedValue(null);
      await expect(service.findById("car-999")).rejects.toThrow(NotFoundException);
    });
  });
});
