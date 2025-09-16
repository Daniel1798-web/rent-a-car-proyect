import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { CreateCarDto } from "../../cars/dto/create-car.dto";
import { UpdateCarDto } from "../../cars/dto/update-car.dto";
import { CarModel } from "@prisma/client";

@Injectable()
export class AdminCarsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCarDto): Promise<CarModel> {
    const existing = await this.prisma.carModel.findUnique({
      where: {
        make_model: {
          make: dto.make,
          model: dto.model
        }
      }
    });
    if (existing) {
      throw new BadRequestException("Este modelo ya existe");
    }
    return this.prisma.carModel.create({ data: dto });
  }

  async update(id: string, dto: UpdateCarDto): Promise<CarModel> {
    const car = await this.prisma.carModel.findUnique({ where: { id } });
    if (!car) throw new NotFoundException("Modelo de auto no encontrado");

    if ((dto.make && dto.model) || dto.make || dto.model) {
      const make = dto.make ?? car.make;
      const model = dto.model ?? car.model;

      const conflict = await this.prisma.carModel.findFirst({
        where: { make, model, NOT: { id } }
      });
      if (conflict) throw new BadRequestException("Ya existe un modelo con esa combinación make+model");
    }

    return this.prisma.carModel.update({
      where: { id },
      data: dto
    });
  }
}
