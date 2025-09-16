import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  await prisma.branch.createMany({
    data: [
      { name: "Sucursal Centro", address: "Calle Falsa 123" },
      { name: "Sucursal Norte", address: "Av. Siempre Viva 456" }
    ],
    skipDuplicates: true
  });

  const hashedEmployeePassword = await argon2.hash("miPassword123");
  await prisma.user.upsert({
    where: { email: "empleado1@rentacar.com" },
    update: {},
    create: {
      email: "empleado1@rentacar.com",
      name: "Empleado Admin",
      password: hashedEmployeePassword,
      role: "employee"
    }
  });

  const hashedCustomerPassword = await argon2.hash("miPassword123");
  await prisma.user.upsert({
    where: { email: "usuario@gmail.com" },
    update: {},
    create: {
      email: "usuario@gmail.com",
      name: "Usuario Cliente",
      password: hashedCustomerPassword,
      role: "customer"
    }
  });

  const allBranches = await prisma.branch.findMany();
  if (allBranches.length === 0) throw new Error("No branches found");

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
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    void prisma.$disconnect();
  });
