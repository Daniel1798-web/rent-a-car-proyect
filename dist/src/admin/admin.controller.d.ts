import { AuthService } from "../auth/auth.service";
import { LoginDto } from "../auth/dto/login.dto";
export declare class AdminAuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
