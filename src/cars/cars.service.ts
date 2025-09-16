import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CarModel } from "@prisma/client";

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async findAllWithAvailability(params: { branchId?: string; startDate?: string; endDate?: string }) {
    const { branchId, startDate, endDate } = params;

    const cars = await this.prisma.carModel.findMany({
      orderBy: [{ make: "asc" }, { model: "asc" }],
      include: { inventory: true }
    });

    let start: Date | undefined;
    let end: Date | undefined;
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        throw new BadRequestException("Fechas inválidas o startDate > endDate");
      }
    }

    const results: Array<
      CarModel & {
        availableQuantity: number;
        isAvailable: boolean;
        inventoryForBranch: { branchId: string; quantity: number } | null;
      }
    > = [];

    for (const car of cars) {
      let inventoryQty = 0;
      let inventoryForBranch: { branchId: string; quantity: number } | null = null;
      if (branchId) {
        const inv = car.inventory.find((i) => i.branchId === branchId);
        inventoryQty = inv ? inv.quantity : 0;
        inventoryForBranch = inv ? { branchId: inv.branchId, quantity: inv.quantity } : null;
      } else {
        inventoryQty = car.inventory.reduce((s, i) => s + (i.quantity ?? 0), 0);
      }

      if (!start || !end) {
        results.push({
          ...car,
          availableQuantity: inventoryQty,
          isAvailable: inventoryQty > 0,
          inventoryForBranch
        });
        continue;
      }

      const reservedCount = await this.prisma.reservation.count({
        where: {
          carModelId: car.id,
          ...(branchId ? { branchId } : {}),
          status: { not: "CANCELLED" },
          AND: [{ startDate: { lte: end } }, { endDate: { gte: start } }]
        }
      });

      const availableQuantity = inventoryQty - reservedCount;
      results.push({
        ...car,
        availableQuantity: availableQuantity > 0 ? availableQuantity : 0,
        isAvailable: availableQuantity > 0,
        inventoryForBranch
      });
    }

    return results;
  }

  async findById(id: string) {
    const car = await this.prisma.carModel.findUnique({
      where: { id },
      include: {
        inventory: { include: { branch: true } }
      }
    });

    if (!car) {
      throw new NotFoundException("Vehículo no encontrado");
    }

    return car;
  }
}
