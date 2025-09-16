import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, Role } from "./roles.decorator";
import { Request } from "express";

export interface JwtPayload {
  sub: string;
  email: string;
  role: "customer" | "employee";
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();

    if (!requiredRoles) {
      return true;
    }

    const user = request.user;
    return !!user && requiredRoles.includes(user.role);
  }
}
