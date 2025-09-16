import { AdminDiscountsService } from "./admin-discounts.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
export declare class AdminDiscountsController {
    private readonly discountsService;
    constructor(discountsService: AdminDiscountsService);
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
