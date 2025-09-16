import { Module } from "@nestjs/common";
import { AdminCarsController } from "./admin-cars.controller";
import { CarsModule } from "../../cars/cars.module";
import { PrismaService } from "../../../prisma/prisma.service";
import { AdminCarsService } from "./admin-cars.service";

@Module({
  imports: [CarsModule],
  controllers: [AdminCarsController],
  providers: [PrismaService, AdminCarsService]
})
export class AdminCarsModule {}
