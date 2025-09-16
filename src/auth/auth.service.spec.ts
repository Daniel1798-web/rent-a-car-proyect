import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";

describe("AuthService", () => {
  let service: AuthService;
  let prisma: { user: { create: jest.Mock; findUnique: jest.Mock } };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    prisma = {
      user: { create: jest.fn(), findUnique: jest.fn() }
    };
    jwtService = { sign: jest.fn().mockReturnValue("fake-token") };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe("register", () => {
    it("debería crear un usuario con contraseña hasheada", async () => {
      const dto = { email: "a@b.com", fullName: "Usuario", password: "pass123" };
      const hashed = "hashed-pass";
      jest.spyOn(argon2, "hash").mockResolvedValue(hashed);

      const mockUser: User = {
        id: "user-1",
        email: dto.email,
        name: dto.fullName,
        password: hashed,
        role: "customer",
        createdAt: new Date()
      };
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await service.register(dto);

      expect(argon2.hash).toHaveBeenCalledWith(dto.password);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { email: dto.email, name: dto.fullName, password: hashed, role: "customer" }
      });
      expect(result).toEqual({ id: mockUser.id, email: mockUser.email, name: mockUser.name });
    });
  });

  describe("login", () => {
    it("debería devolver un token si las credenciales son válidas", async () => {
      const dto = { email: "a@b.com", password: "pass123" };
      const mockUser: User = {
        id: "user-1",
        email: dto.email,
        name: "Usuario",
        password: "hashed-pass",
        role: "customer",
        createdAt: new Date()
      };
      prisma.user.findUnique.mockResolvedValue(mockUser);
      jest.spyOn(argon2, "verify").mockResolvedValue(true);

      const result = await service.login(dto);

      expect(argon2.verify).toHaveBeenCalledWith(mockUser.password, dto.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id, role: mockUser.role });
      expect(result).toEqual({ access_token: "fake-token" });
    });

    it("lanza UnauthorizedException si las credenciales son inválidas", async () => {
      const dto = { email: "a@b.com", password: "wrong" };
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
