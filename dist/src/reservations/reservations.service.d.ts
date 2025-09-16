import { PrismaService } from "../../prisma/prisma.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
export declare class ReservationsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReservation(userId: string, dto: CreateReservationDto): Promise<{
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
    }>;
    getMyReservations(userId: string): Promise<({
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
    cancelReservation(userId: string, reservationId: string): Promise<{
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
    }>;
}
