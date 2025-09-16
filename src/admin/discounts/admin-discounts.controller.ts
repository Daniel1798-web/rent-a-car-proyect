import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AdminDiscountsService } from "./admin-discounts.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/roles/roles.guard";
import { Roles } from "../../auth/roles/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("Admin Discounts")
@Controller("admin/discounts")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
export class AdminDiscountsController {
  constructor(private readonly discountsService: AdminDiscountsService) {}

  @Post()
  @Roles("employee")
  @ApiOperation({ summary: "Creá un descuento para cliente" })
  @ApiBody({
    type: CreateDiscountDto,
    examples: {
      example1: {
        summary: "Descuento ejemplo",
        value: {
          code: "PROMO15",
          userId: "97ae6ab9-9770-4883-9193-964d9d500d7e",
          percentage: 15,
          validFrom: "2025-09-16",
          validTo: "2025-12-31",
          active: true
        }
      }
    }
  })
  create(@Body() dto: CreateDiscountDto) {
    return this.discountsService.create(dto);
  }
}
