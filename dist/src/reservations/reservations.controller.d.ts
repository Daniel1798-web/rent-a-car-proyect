import { ReservationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { Request } from "express";
interface RequestWithUser extends Request {
    user?: {
        sub: string;
        email?: string;
        roles?: string[];
    };
}
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(req: RequestWithUser, dto: CreateReservationDto): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        createdAt: Date;
        userId: string;
        carModelId: string;
        branchId: string;
        discountId: string | null;
    }>;
    getMyReservations(req: RequestWithUser): Promise<({
        carModel: {
            id: string;
            make: string;
            model: string;
            seats: number;
            dailyRate: number;
        };
        branch: {
            id: string;
            name: string;
            address: string;
        };
    } & {
        id: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        createdAt: Date;
        userId: string;
        carModelId: string;
        branchId: string;
        discountId: string | null;
    })[]>;
    cancelReservation(req: RequestWithUser, reservationId: string): Promise<{
        id: string;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
        status: import(".prisma/client").$Enums.ReservationStatus;
        createdAt: Date;
        userId: string;
        carModelId: string;
        branchId: string;
        discountId: string | null;
    }>;
}
export {};
