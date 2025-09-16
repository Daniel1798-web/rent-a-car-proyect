import { Module } from "@nestjs/common";
import { AdminDiscountsController } from "./admin-discounts.controller";
import { AdminDiscountsService } from "./admin-discounts.service";
import { PrismaService } from "../../../prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [AdminDiscountsController],
  providers: [AdminDiscountsService, PrismaService]
})
export class AdminDiscountsModule {}
