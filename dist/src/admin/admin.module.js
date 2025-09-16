"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
const jwt_strategy_guard_1 = require("../auth/guard/jwt-strategy.guard");
const inventory_controller_1 = require("./inventory/inventory.controller");
const inventory_service_1 = require("./inventory/inventory.service");
const admin_controller_1 = require("./admin.controller");
const admin_cars_module_1 = require("./adminCars/admin-cars.module");
const inventory_module_1 = require("./inventory/inventory.module");
const admin_discounts_module_1 = require("./discounts/admin-discounts.module");
const admin_reservations_module_1 = require("./adminReservation/admin-reservations.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_cars_module_1.AdminCarsModule,
            admin_discounts_module_1.AdminDiscountsModule,
            admin_reservations_module_1.AdminReservationsModule,
            inventory_module_1.InventoryModule,
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: "1h" } })
        ],
        controllers: [inventory_controller_1.InventoryController, admin_controller_1.AdminAuthController],
        providers: [inventory_service_1.InventoryService, prisma_service_1.PrismaService, auth_service_1.AuthService, jwt_strategy_guard_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_strategy_guard_1.JwtStrategy]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map