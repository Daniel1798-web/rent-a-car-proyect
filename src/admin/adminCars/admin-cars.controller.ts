import { Controller, Post, Put, Body, Param, UseGuards } from "@nestjs/common";
import { AdminCarsService } from "./admin-cars.service";
import { CreateCarDto } from "../../cars/dto/create-car.dto";
import { UpdateCarDto } from "../../cars/dto/update-car.dto";
import { RolesGuard } from "../../auth/roles/roles.guard";
import { Roles } from "../../auth/roles/roles.decorator";
import { CarModel } from "@prisma/client";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Admin Cars")
@Controller("admin/cars")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("access-token")
export class AdminCarsController {
  constructor(private readonly createCarsService: AdminCarsService) {}

  @Post()
  @Roles("employee")
  @ApiOperation({ summary: "Crear un nuevo modelo de auto" })
  @ApiBody({ type: CreateCarDto })
  create(@Body() dto: CreateCarDto): Promise<CarModel> {
    return this.createCarsService.create(dto);
  }

  @Put(":id")
  @Roles("employee")
  @ApiOperation({ summary: "Actualizar un modelo de auto existente" })
  @ApiParam({ name: "id", description: "ID del modelo de auto" })
  @ApiBody({ type: UpdateCarDto })
  update(@Param("id") id: string, @Body() dto: UpdateCarDto): Promise<CarModel> {
    return this.createCarsService.update(id, dto);
  }
}
