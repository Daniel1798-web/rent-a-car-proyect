import { PrismaService } from "../../../prisma/prisma.service";
export declare class AdminReservationsController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
        branch: {
            id: string;
            name: string;
            address: string;
        };
        carModel: {
            id: string;
            make: string;
            model: string;
            seats: number;
            dailyRate: number;
        };
        discount: {
            id: string;
            code: string | null;
            percentage: number;
            userId: string | null;
            validFrom: Date;
            validTo: Date;
            active: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        branchId: string;
        carModelId: string;
        startDate: Date;
        endDate: Date;
        userId: string;
        totalPrice: number;
        discountId: string | null;
        status: import(".prisma/client").$Enums.ReservationStatus;
    })[]>;
}
