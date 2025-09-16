import { Module } from "@nestjs/common";
import { AdminReservationsController } from "./admin-reservations.controller";
import { PrismaModule } from "../../../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AdminReservationsController]
})
export class AdminReservationsModule {}
