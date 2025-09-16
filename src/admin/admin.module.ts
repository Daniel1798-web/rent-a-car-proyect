import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { JwtStrategy } from "../auth/guard/jwt-strategy.guard";

import { InventoryController } from "./inventory/inventory.controller";
import { InventoryService } from "./inventory/inventory.service";
import { AdminAuthController } from "./admin.controller";
import { AdminCarsModule } from "./adminCars/admin-cars.module";
import { InventoryModule } from "./inventory/inventory.module";
import { AdminDiscountsModule } from "./discounts/admin-discounts.module";
import { AdminReservationsModule } from "./adminReservation/admin-reservations.module";
@Module({
  imports: [
    AdminCarsModule,
    AdminDiscountsModule,
    AdminReservationsModule,
    InventoryModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: "1h" } })
  ],
  controllers: [InventoryController, AdminAuthController],
  providers: [InventoryService, PrismaService, AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy]
})
export class AdminModule {}
