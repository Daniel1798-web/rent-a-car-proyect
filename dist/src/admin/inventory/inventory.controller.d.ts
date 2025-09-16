import { InventoryService } from "./inventory.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
import { AvailabilityQueryDto } from "./dto/availability-query.dto";
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    upsert(dto: CreateInventoryDto): Promise<{
        id: string;
        quantity: number;
        branchId: string;
        carModelId: string;
    }>;
    getAvailability(query: AvailabilityQueryDto): Promise<{
        availableQuantity: number;
        isAvailable: boolean;
        inventory: {
            id: string;
            quantity: number;
            branchId: string;
            carModelId: string;
        }[];
        id: string;
        make: string;
        model: string;
        seats: number;
        dailyRate: number;
    }[]>;
}
