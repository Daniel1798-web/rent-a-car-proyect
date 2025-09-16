import { PrismaService } from "../../../prisma/prisma.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
export declare class AdminDiscountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDiscountDto): Promise<{
        id: string;
        code: string | null;
        percentage: number;
        userId: string | null;
        validFrom: Date;
        validTo: Date;
        active: boolean;
    }>;
}
