import { Body, Controller, Post, Get, Delete, Param, Req, UseGuards, BadRequestException } from "@nestjs/common";
import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from "@nestjs/swagger";
import { Request } from "express";

interface RequestWithUser extends Request {
  user?: {
    sub: string;
    email?: string;
    roles?: string[];
  };
}

@ApiTags("Reservations")
@Controller("reservations")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("access-token")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: "Creá una reserva para el cliente autenticado" })
  @ApiBody({
    type: CreateReservationDto,
    examples: {
      example1: {
        summary: "Reserva de auto ejemplo",
        value: {
          carModelId: "modelID",
          branchId: "branchID",
          startDate: "2025-10-01",
          endDate: "2025-10-05"
        }
      }
    }
  })
  async create(@Req() req: RequestWithUser, @Body() dto: CreateReservationDto) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new BadRequestException("Token inválido: falta userId");
    }
    return this.reservationsService.createReservation(userId, dto);
  }

  @Get("me")
  @ApiOperation({ summary: "Listá las reservas del cliente autenticado" })
  async getMyReservations(@Req() req: RequestWithUser) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new BadRequestException("Token inválido: falta userId");
    }
    return this.reservationsService.getMyReservations(userId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Cancelá una reserva del cliente si cumple las condiciones" })
  @ApiParam({
    name: "id",
    description: "ID de la reserva a cancelar",
    example: "123e4567-e89b-12d3-a456-426614174000"
  })
  async cancelReservation(@Req() req: RequestWithUser, @Param("id") reservationId: string) {
    const userId = req.user?.sub;
    if (!userId) throw new BadRequestException("Token inválido: falta userId");
    return this.reservationsService.cancelReservation(userId, reservationId);
  }
}
