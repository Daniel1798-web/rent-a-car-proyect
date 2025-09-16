import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LoginDto } from "../auth/dto/login.dto";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("Admin Auth")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login de empleado/admin" })
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: "Login de empleado",
        value: {
          email: "empleado1@rentacar.com",
          password: "miPassword123"
        }
      }
    }
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
