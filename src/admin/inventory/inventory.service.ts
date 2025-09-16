import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async upsertInventory(dto: CreateInventoryDto) {
    const { branchId, carModelId, quantity } = dto;

    const branch = await this.prisma.branch.findUnique({ where: { id: branchId } });
    if (!branch) throw new BadRequestException("Sucursal no encontrada.");

    const car = await this.prisma.carModel.findUnique({ where: { id: carModelId } });
    if (!car) throw new BadRequestException("Modelo de auto no encontrado.");

    return this.prisma.inventory.upsert({
      where: { branchId_carModelId: { branchId, carModelId } },
      update: { quantity },
      create: { branchId, carModelId, quantity }
    });
  }

  async checkAvailability(filters: { branchId?: string; startDate?: string; endDate?: string }) {
    const { branchId } = filters;

    const cars = await this.prisma.carModel.findMany({
      include: {
        inventory: branchId ? { where: { branchId } } : true
      }
    });

    return cars.map((car) => {
      const total = car.inventory.reduce((sum, inv) => sum + inv.quantity, 0);
      return {
        ...car,
        availableQuantity: total,
        isAvailable: total > 0
      };
    });
  }
}
