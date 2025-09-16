import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AdminDiscountsService } from "./admin-discounts.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/roles/roles.guard";
import { Roles } from "../../auth/roles/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Admin Discounts")
@Controller("admin/discounts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminDiscountsController {
  constructor(private readonly discountsService: AdminDiscountsService) {}

  @Post()
  @Roles("employee")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Creá un descuento para cliente" })
  create(@Body() dto: CreateDiscountDto) {
    return this.discountsService.create(dto);
  }
}
