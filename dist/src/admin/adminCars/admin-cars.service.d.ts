import { PrismaService } from "../../../prisma/prisma.service";
import { CreateCarDto } from "../../cars/dto/create-car.dto";
import { UpdateCarDto } from "../../cars/dto/update-car.dto";
import { CarModel } from "@prisma/client";
export declare class AdminCarsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCarDto): Promise<CarModel>;
    update(id: string, dto: UpdateCarDto): Promise<CarModel>;
}
