import { Test, TestingModule } from "@nestjs/testing";
import { AdminDiscountsService } from "./admin-discounts.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { BadRequestException } from "@nestjs/common";
import { Discount, User } from "@prisma/client";

describe("AdminDiscountsService", () => {
  let service: AdminDiscountsService;
  let prisma: {
    user: { findUnique: jest.Mock<Promise<User | null>, any> };
    discount: { create: jest.Mock<Promise<Discount>, any> };
  };

  beforeEach(async () => {
    prisma = {
      user: { findUnique: jest.fn<Promise<User | null>, [any]>() },
      discount: { create: jest.fn<Promise<Discount>, [any]>() }
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDiscountsService, { provide: PrismaService, useValue: prisma }]
    }).compile();

    service = module.get<AdminDiscountsService>(AdminDiscountsService);
  });

  describe("create", () => {
    const dto = { code: "PROMO20", percentage: 20, userId: "user-1" };

    it("lanza error si el usuario no existe", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(new BadRequestException("Usuario no encontrado"));
    });

    it("crea un descuento correctamente si el usuario existe", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: "user-1",
        email: "a@b.com",
        name: "Usuario",
        password: "hash",
        role: "customer",
        createdAt: new Date()
      });

      const mockDiscount: Discount = {
        id: "disc-1",
        code: dto.code,
        percentage: dto.percentage,
        userId: dto.userId,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        active: true
      };
      prisma.discount.create.mockResolvedValue(mockDiscount);

      const result = await service.create(dto);

      expect(result).toEqual(mockDiscount);
      expect(prisma.discount.create).toHaveBeenCalled();
    });

    it("crea un descuento sin userId correctamente", async () => {
      const dtoNoUser = { code: "PROMO30", percentage: 30 };

      const mockDiscount: Discount = {
        id: "disc-2",
        code: dtoNoUser.code,
        percentage: dtoNoUser.percentage,
        userId: null,
        validFrom: new Date(),
        validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        active: true
      };
      prisma.discount.create.mockResolvedValue(mockDiscount);

      const result = await service.create(dtoNoUser);

      expect(result).toEqual(mockDiscount);
      expect(prisma.discount.create).toHaveBeenCalled();
    });
  });
});
