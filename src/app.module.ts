import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdminModule } from "./admin/admin.module";
import { CarsModule } from "./cars/cars.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [AuthModule, CarsModule, ReservationsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
