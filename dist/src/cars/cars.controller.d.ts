import { CarsService } from "./cars.service";
import { CarsQueryDto } from "./dto/cars.dto";
export declare class CarsController {
    private readonly carsService;
    constructor(carsService: CarsService);
    findAll(query: CarsQueryDto): Promise<({
        id: string;
        make: string;
        model: string;
        seats: number;
        dailyRate: number;
    } & {
        availableQuantity: number;
        isAvailable: boolean;
        inventoryForBranch: {
            branchId: string;
            quantity: number;
        } | null;
    })[]>;
    getCarById(id: string): Promise<{
        inventory: ({
            branch: {
                id: string;
                name: string;
                address: string;
            };
        } & {
            id: string;
            quantity: number;
            branchId: string;
            carModelId: string;
        })[];
    } & {
        id: string;
        make: string;
        model: string;
        seats: number;
        dailyRate: number;
    }>;
}
