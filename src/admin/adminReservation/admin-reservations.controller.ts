import { Controller, Get, UseGuards } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/roles/roles.guard";
import { Roles } from "../../auth/roles/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Admin Reservations")
@Controller("admin/reservations")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminReservationsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Roles("employee")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Listá todas las reservas" })
  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        user: true,
        carModel: true,
        branch: true,
        discount: true
      },
      orderBy: { createdAt: "desc" }
    });
  }
}
