"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Rent A Car API")
        .setDescription("API para gestión de reservas de autos")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header"
    }, "access-token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
    console.log(`Swagger available on http://localhost:${process.env.PORT ?? 3000}/api`);
}
void bootstrap();
//# sourceMappingURL=main.js.map