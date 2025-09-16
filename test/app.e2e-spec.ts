import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as supertest from "supertest";
import { AppModule } from "../src/app.module";

interface LoginResponse {
  access_token: string;
}

interface CarModel {
  id: string;
  make: string;
  model: string;
  seats: number;
  dailyRate: number;
  inventory: any[];
}

interface Reservation {
  id: string;
  userId: string;
  carModelId: string;
  branchId: string;
  startDate: string;
  endDate: string;
  totalPrice?: number;
  discountId?: string | null;
  status?: string;
  createdAt?: string;
}

interface Discount {
  id: string;
  code?: string | null;
  percentage: number;
  userId?: string | null;
  validFrom?: string;
  validTo?: string;
  active: boolean;
}

describe("App (e2e)", () => {
  let app: INestApplication;
  let request: ReturnType<typeof supertest>;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    request = supertest(app.getHttpServer());

    const adminLoginRes = await request
      .post("/admin/auth/login")
      .send({ email: "empleado1@rentacar.com", password: "miPassword123" });
    expect([200, 201]).toContain(adminLoginRes.status);
    adminToken = (adminLoginRes.body as LoginResponse).access_token;

    const userLoginRes = await request
      .post("/auth/login")
      .send({ email: "usuario@gmail.com", password: "miPassword123" });
    expect([200, 201]).toContain(userLoginRes.status);
    userToken = (userLoginRes.body as LoginResponse).access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it("/ (GET) root route", async () => {
    const res = await request.get("/");
    expect([200, 201]).toContain(res.status);
  });

  it("/cars (GET) should return all cars with inventory", async () => {
    const res = await request.get("/cars");
    expect([200, 201]).toContain(res.status);
    const cars = res.body as CarModel[];
    expect(Array.isArray(cars)).toBe(true);
    if (cars.length > 0) {
      expect(cars[0]).toHaveProperty("id");
      expect(cars[0]).toHaveProperty("make");
      expect(cars[0]).toHaveProperty("inventory");
    }
  });

  it("/admin/inventory/availability (GET) should return availability", async () => {
    const res = await request.get("/admin/inventory/availability").set("Authorization", `Bearer ${adminToken}`);
    expect([200, 201]).toContain(res.status);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("/admin/cars (POST) should create a car", async () => {
    const uniqueId = Date.now();
    const carPayload = {
      make: `Toyota-${uniqueId}`,
      model: `Corolla-${uniqueId}`,
      seats: 5,
      dailyRate: 100
    };

    const res = await request.post("/admin/cars").set("Authorization", `Bearer ${adminToken}`).send(carPayload);

    expect([200, 201]).toContain(res.status);
    const car = res.body as CarModel;
    expect(car).toHaveProperty("id");
  });

  it("/admin/reservations (GET) should return all reservations", async () => {
    const res = await request.get("/admin/reservations").set("Authorization", `Bearer ${adminToken}`);
    expect([200, 201]).toContain(res.status);
    const reservations = res.body as Reservation[];
    expect(Array.isArray(reservations)).toBe(true);
  });

  it("/admin/discounts (POST) should create a discount", async () => {
    const uniqueCode = `SUMMER-${Date.now()}`;
    const discountPayload = {
      code: uniqueCode,
      percentage: 15,
      userId: undefined,
      startDate: "2025-01-01",
      endDate: "2025-12-31"
    };

    const res = await request
      .post("/admin/discounts")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(discountPayload);

    expect([200, 201]).toContain(res.status);
    const discount = res.body as Discount;
    expect(discount).toHaveProperty("id");
  });

  it("/reservations/me (GET) user reservations", async () => {
    const res = await request.get("/reservations/me").set("Authorization", `Bearer ${userToken}`);
    expect([200, 201]).toContain(res.status);
    const reservations = res.body as Reservation[];
    expect(Array.isArray(reservations)).toBe(true);
  });
});
