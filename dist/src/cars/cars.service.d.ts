import { PrismaService } from "../../prisma/prisma.service";
export declare class CarsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllWithAvailability(params: {
        branchId?: string;
        startDate?: string;
        endDate?: string;
    }): Promise<({
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
    findById(id: string): Promise<{
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
