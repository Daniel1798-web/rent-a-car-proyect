"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCarsModule = void 0;
const common_1 = require("@nestjs/common");
const admin_cars_controller_1 = require("./admin-cars.controller");
const cars_module_1 = require("../../cars/cars.module");
const prisma_service_1 = require("../../../prisma/prisma.service");
const admin_cars_service_1 = require("./admin-cars.service");
let AdminCarsModule = class AdminCarsModule {
};
exports.AdminCarsModule = AdminCarsModule;
exports.AdminCarsModule = AdminCarsModule = __decorate([
    (0, common_1.Module)({
        imports: [cars_module_1.CarsModule],
        controllers: [admin_cars_controller_1.AdminCarsController],
        providers: [prisma_service_1.PrismaService, admin_cars_service_1.AdminCarsService]
    })
], AdminCarsModule);
//# sourceMappingURL=admin-cars.module.js.map