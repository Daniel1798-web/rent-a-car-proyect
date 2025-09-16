"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2 = require("argon2");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.branch.createMany({
        data: [
            { name: "Sucursal Centro", address: "Calle Falsa 123" },
            { name: "Sucursal Norte", address: "Av. Siempre Viva 456" }
        ],
        skipDuplicates: true
    });
    console.log("Branches seeded ✅");
    const hashedPassword = await argon2.hash("miPassword123");
    await prisma.user.upsert({
        where: { email: "empleado1@rentacar.com" },
        update: {},
        create: {
            email: "empleado1@rentacar.com",
            name: "Empleado Admin",
            password: hashedPassword,
            role: "employee"
        }
    });
    console.log("Employee seeded ✅");
    const allBranches = await prisma.branch.findMany();
    if (allBranches.length === 0)
        throw new Error("No branches found");
    const carsData = [
        { make: "Toyota", model: "Corolla", seats: 5, dailyRate: 50 },
        { make: "Ford", model: "Fiesta", seats: 4, dailyRate: 40 },
        { make: "Volkswagen", model: "Golf", seats: 5, dailyRate: 55 }
    ];
    for (const car of carsData) {
        await prisma.carModel.upsert({
            where: { make_model: { make: car.make, model: car.model } },
            update: {},
            create: {
                ...car,
                inventory: {
                    create: allBranches.map((branch) => ({
                        branchId: branch.id,
                        quantity: 5
                    }))
                }
            }
        });
    }
    const cars = await prisma.carModel.findMany({
        include: { inventory: true }
    });
    console.log("\n📦 Datos de prueba generados:");
    console.table(allBranches.map((b) => ({ id: b.id, name: b.name })));
    console.table(cars.map((c) => ({ id: c.id, make: c.make, model: c.model })));
}
main()
    .catch((e) => console.error(e))
    .finally(() => {
    void prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map