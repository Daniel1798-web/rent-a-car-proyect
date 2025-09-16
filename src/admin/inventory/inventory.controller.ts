import { Controller, Post, Body, UseGuards, Get, Query } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { RolesGuard } from "../../auth/roles/roles.guard";
import { Roles } from "../../auth/roles/roles.decorator";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { AvailabilityQueryDto } from "./dto/availability-query.dto";

@ApiTags("Admin Inventory")
@Controller("admin/inventory")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @Roles("employee")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Agregar o actualizar inventario de un modelo de auto en una sucursal" })
  upsert(@Body() dto: CreateInventoryDto) {
    return this.inventoryService.upsertInventory(dto);
  }

  @Get("availability")
  @Roles("employee")
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Consultar disponibilidad de autos" })
  @ApiQuery({ name: "branchId", required: false })
  @ApiQuery({ name: "startDate", required: false })
  @ApiQuery({ name: "endDate", required: false })
  async getAvailability(@Query() query: AvailabilityQueryDto) {
    return this.inventoryService.checkAvailability(query);
  }
}
