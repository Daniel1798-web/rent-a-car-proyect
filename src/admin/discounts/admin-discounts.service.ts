import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import type { User } from "@prisma/client";

@Injectable()
export class AdminDiscountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDiscountDto) {
    let user: User | null = null;

    if (dto.userId) {
      user = await this.prisma.user.findUnique({
        where: { id: dto.userId }
      });

      if (!user) {
        throw new BadRequestException("Usuario no encontrado");
      }
    }

    const validFrom = dto.startDate ? new Date(dto.startDate) : new Date();
    const validTo = dto.endDate ? new Date(dto.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    return this.prisma.discount.create({
      data: {
        code: dto.code,
        percentage: dto.percentage,
        userId: dto.userId ?? null,
        validFrom,
        validTo,
        active: true
      }
    });
  }
}
