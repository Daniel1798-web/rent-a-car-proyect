export declare const ROLES_KEY = "roles";
export type Role = "customer" | "employee";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
