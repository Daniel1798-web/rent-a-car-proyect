import { Controller, Get, Param, Query } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsQueryDto } from "./dto/cars.dto";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(@Query() query: CarsQueryDto) {
    return this.carsService.findAllWithAvailability(query);
  }

  @Get(":id")
  async getCarById(@Param("id") id: string) {
    return this.carsService.findById(id);
  }
}
