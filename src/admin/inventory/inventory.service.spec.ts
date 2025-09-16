import { Test, TestingModule } from "@nestjs/testing";
import { InventoryService } from "./inventory.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { BadRequestException } from "@nestjs/common";
import { Branch, CarModel, Inventory } from "@prisma/client";

describe("InventoryService", () => {
  let service: InventoryService;
  let prisma: {
    branch: { findUnique: jest.Mock };
    carModel: { findUnique: jest.Mock };
    inventory: { upsert: jest.Mock };
  };

  beforeEach(async () => {
    prisma = {
      branch: { findUnique: jest.fn() },
      carModel: { findUnique: jest.fn() },
      inventory: { upsert: jest.fn() }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService, { provide: PrismaService, useValue: prisma }]
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  describe("upsertInventory", () => {
    const dto = { branchId: "branch-1", carModelId: "car-1", quantity: 10 };

    it("lanza error si la sucursal no existe", async () => {
      prisma.branch.findUnique.mockResolvedValue(null);
      await expect(service.upsertInventory(dto)).rejects.toThrow(new BadRequestException("Sucursal no encontrada."));
    });

    it("lanza error si el modelo de auto no existe", async () => {
      prisma.branch.findUnique.mockResolvedValue({ id: "branch-1", name: "Sucursal", address: "Calle" } as Branch);
      prisma.carModel.findUnique.mockResolvedValue(null);
      await expect(service.upsertInventory(dto)).rejects.toThrow(
        new BadRequestException("Modelo de auto no encontrado.")
      );
    });

    it("crea o actualiza inventario correctamente", async () => {
      const mockBranch: Pick<Branch, "id" | "name" | "address"> = {
        id: "branch-1",
        name: "Sucursal",
        address: "Calle"
      };
      const mockCar: Pick<CarModel, "id" | "make" | "model" | "seats" | "dailyRate"> = {
        id: "car-1",
        make: "Toyota",
        model: "Corolla",
        seats: 5,
        dailyRate: 100
      };
      const mockInventory: Inventory = { id: "inv-1", branchId: "branch-1", carModelId: "car-1", quantity: 10 };

      prisma.branch.findUnique.mockResolvedValue(mockBranch as Branch);
      prisma.carModel.findUnique.mockResolvedValue(mockCar as CarModel);
      prisma.inventory.upsert.mockResolvedValue(mockInventory);

      const result = await service.upsertInventory(dto);
      expect(result).toEqual(mockInventory);
      expect(prisma.inventory.upsert).toHaveBeenCalledWith({
        where: { branchId_carModelId: { branchId: "branch-1", carModelId: "car-1" } },
        update: { quantity: 10 },
        create: { branchId: "branch-1", carModelId: "car-1", quantity: 10 }
      });
    });
  });
});
