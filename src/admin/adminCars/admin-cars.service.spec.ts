import { Test, TestingModule } from "@nestjs/testing";
import { AdminCarsService } from "./admin-cars.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CarModel } from "@prisma/client";

describe("AdminCarsService", () => {
  let service: AdminCarsService;
  let prisma: {
    carModel: {
      findUnique: jest.Mock;
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminCarsService,
        {
          provide: PrismaService,
          useValue: {
            carModel: {
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn()
            }
          }
        }
      ]
    }).compile();

    service = module.get<AdminCarsService>(AdminCarsService);
    prisma = module.get(PrismaService);
  });

  describe("create", () => {
    const dto = { make: "Toyota", model: "Corolla", seats: 5, dailyRate: 100 };

    it("lanza error si el modelo ya existe", async () => {
      prisma.carModel.findUnique.mockResolvedValue({ id: "car-1" } as CarModel);

      await expect(service.create(dto)).rejects.toThrow(new BadRequestException("Este modelo ya existe"));
    });

    it("crea correctamente un nuevo modelo", async () => {
      prisma.carModel.findUnique.mockResolvedValue(null);
      prisma.carModel.create.mockResolvedValue({ id: "car-2", ...dto } as CarModel);

      const result = await service.create(dto);
      expect(result.id).toBe("car-2");
      expect(prisma.carModel.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe("update", () => {
    const dtoUpdate = { make: "Toyota", model: "Corolla Altis", seats: 5, dailyRate: 120 };

    it("lanza error si el modelo no existe", async () => {
      prisma.carModel.findUnique.mockResolvedValue(null);
      await expect(service.update("car-1", dtoUpdate)).rejects.toThrow(
        new NotFoundException("Modelo de auto no encontrado")
      );
    });

    it("lanza error si hay conflicto make+model", async () => {
      prisma.carModel.findUnique.mockResolvedValue({ id: "car-1", make: "Toyota", model: "Corolla" } as CarModel);
      prisma.carModel.findFirst.mockResolvedValue({ id: "car-2" } as CarModel);

      await expect(service.update("car-1", { make: "Toyota", model: "Corolla" })).rejects.toThrow(
        new BadRequestException("Ya existe un modelo con esa combinación make+model")
      );
    });

    it("actualiza correctamente un modelo existente", async () => {
      prisma.carModel.findUnique.mockResolvedValue({ id: "car-1", make: "Toyota", model: "Corolla" } as CarModel);
      prisma.carModel.findFirst.mockResolvedValue(null);
      prisma.carModel.update.mockResolvedValue({ id: "car-1", ...dtoUpdate } as CarModel);

      const result = await service.update("car-1", dtoUpdate);
      expect(result.dailyRate).toBe(120);
      expect(prisma.carModel.update).toHaveBeenCalledWith({
        where: { id: "car-1" },
        data: dtoUpdate
      });
    });
  });
});
