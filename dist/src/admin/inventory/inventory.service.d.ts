import { PrismaService } from "../../../prisma/prisma.service";
import { CreateInventoryDto } from "./dto/create-inventory.dto";
export declare class InventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    upsertInventory(dto: CreateInventoryDto): Promise<{
        id: string;
        quantity: number;
        branchId: string;
        carModelId: string;
    }>;
    checkAvailability(filters: {
        branchId?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<{
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
