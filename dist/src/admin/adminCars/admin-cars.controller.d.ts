import { AdminCarsService } from "./admin-cars.service";
import { CreateCarDto } from "../../cars/dto/create-car.dto";
import { UpdateCarDto } from "../../cars/dto/update-car.dto";
import { CarModel } from "@prisma/client";
export declare class AdminCarsController {
    private readonly createCarsService;
    constructor(createCarsService: AdminCarsService);
    create(dto: CreateCarDto): Promise<CarModel>;
    update(id: string, dto: UpdateCarDto): Promise<CarModel>;
}
