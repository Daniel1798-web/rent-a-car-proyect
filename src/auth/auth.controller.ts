import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiBody } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Registrar un nuevo usuario" })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example1: {
        summary: "Registro de usuario",
        value: {
          email: "usuario@gmail.com",
          fullName: "Antonio",
          password: "miPassword123"
        }
      }
    }
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: "Login de usuario",
        value: {
          email: "empleado1@rentacar.com",
          password: "miPassword123"
        }
      }
    }
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
