"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCarsController = void 0;
const common_1 = require("@nestjs/common");
const admin_cars_service_1 = require("./admin-cars.service");
const create_car_dto_1 = require("../../cars/dto/create-car.dto");
const update_car_dto_1 = require("../../cars/dto/update-car.dto");
const roles_guard_1 = require("../../auth/roles/roles.guard");
const roles_decorator_1 = require("../../auth/roles/roles.decorator");
const jwt_auth_guard_1 = require("../../auth/guard/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let AdminCarsController = class AdminCarsController {
    createCarsService;
    constructor(createCarsService) {
        this.createCarsService = createCarsService;
    }
    create(dto) {
        return this.createCarsService.create(dto);
    }
    update(id, dto) {
        return this.createCarsService.update(id, dto);
    }
};
exports.AdminCarsController = AdminCarsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)("employee"),
    (0, swagger_1.ApiOperation)({ summary: "Crear un nuevo modelo de auto" }),
    (0, swagger_1.ApiBody)({ type: create_car_dto_1.CreateCarDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], AdminCarsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, roles_decorator_1.Roles)("employee"),
    (0, swagger_1.ApiOperation)({ summary: "Actualizar un modelo de auto existente" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "ID del modelo de auto" }),
    (0, swagger_1.ApiBody)({ type: update_car_dto_1.UpdateCarDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], AdminCarsController.prototype, "update", null);
exports.AdminCarsController = AdminCarsController = __decorate([
    (0, swagger_1.ApiTags)("Admin Cars"),
    (0, common_1.Controller)("admin/cars"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    __metadata("design:paramtypes", [admin_cars_service_1.AdminCarsService])
], AdminCarsController);
//# sourceMappingURL=admin-cars.controller.js.map