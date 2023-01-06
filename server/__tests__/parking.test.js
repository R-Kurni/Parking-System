const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const request = require("supertest");
const app = require("../app");

beforeAll(() => {
	queryInterface.bulkInsert(
		"Parkings",
		[
			{
				type: "Car",
				timeIn: "2023-01-04T10:25",
				timeOut: "2023-01-04T12:25",
				price: 10000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				type: "Motorcycle",
				timeIn: "2023-01-04T12:10",
				timeOut: "2023-01-04T15:30",
				price: 8000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				type: "Car",
				timeIn: "2023-01-04T12:05",
				timeOut: "2023-01-04T12:25",
				price: 5000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				type: "Motorcycle",
				timeIn: "2023-01-04T06:10",
				timeOut: "2023-01-04T15:30",
				price: 20000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		null
	);
});

afterAll(() => {
	queryInterface.bulkDelete("Parkings", null, {
		truncate: true,
		restartIdentity: true,
	});
});

describe("GET /parkings - ALL Type of Vehicle", () => {
	test("GET /parkings - success test", async () => {
		const res = await request(app).get("/parkings");
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInS: "2023-01-04T10:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInE: "2023-01-04T13:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInS: "2023-01-04T10:00", timeInE: "2023-01-04T13:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start test", async () => {
		const res = await request(app).get("/parkings").query({ priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price End test", async () => {
		const res = await request(app).get("/parkings").query({ priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ priceS: 5000, priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInS: "2023-01-04T10:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInS: "2023-01-04T10:00", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInS: "2023-01-04T10:00", priceS: 5000, priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInE: "2023-01-04T13:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInE: "2023-01-04T13:00", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ timeInE: "2023-01-04T13:00", priceS: 5000, priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start test", async () => {
		const res = await request(app).get("/parkings").query({
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});
});

describe("GET /parkings - CAR Type of Vehicle", () => {
	test("GET /parkings - success test", async () => {
		const res = await request(app).get("/parkings").query({ type: "Car" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInS: "2023-01-04T10:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInE: "2023-01-04T13:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", priceS: 5000, priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInS: "2023-01-04T10:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInS: "2023-01-04T10:00", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInS: "2023-01-04T10:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInE: "2023-01-04T13:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Car", timeInE: "2023-01-04T13:00", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Car",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Car");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});
});

describe("GET /parkings - MOTORCYCLE Type of Vehicle", () => {
	test("GET /parkings - success test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", timeInS: "2023-01-04T10:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", timeInE: "2023-01-04T13:00" });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Price Start & Price End test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", priceS: 5000, priceE: 15000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", timeInS: "2023-01-04T10:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start test", async () => {
		const res = await request(app)
			.get("/parkings")
			.query({ type: "Motorcycle", timeInE: "2023-01-04T13:00", priceS: 5000 });
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInE: "2023-01-04T13:00",
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In End & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});

	test("GET /parkings - success with Time In Start & Time In End & Price Start & Price End test", async () => {
		const res = await request(app).get("/parkings").query({
			type: "Motorcycle",
			timeInS: "2023-01-04T10:00",
			timeInE: "2023-01-04T13:00",
			priceS: 5000,
			priceE: 15000,
		});
		expect(res.status).toBe(200);
		expect(res.body).toBeInstanceOf(Array);
		expect(res.body[0]).toBeInstanceOf(Object);
		expect(res.body[0]).toHaveProperty("id", expect.any(Number));
		expect(res.body[0]).toHaveProperty("type", expect.any(String));
		expect(res.body[0]).toHaveProperty("type", "Motorcycle");
		expect(res.body[0]).toHaveProperty("timeIn", expect.any(String));
		expect(res.body[0]).toHaveProperty("timeOut", expect.any(String));
		expect(res.body[0]).toHaveProperty("price", expect.any(Number));
	});
});

describe("POST /parkings", () => {
	test("POST /parkings - success test", () => {
		return request(app)
			.post("/parkings")
			.send({
				type: "Car",
				timeIn: "2023-01-04T10:25",
				timeOut: "2023-01-04T12:25",
				price: 10000,
			})
			.then((res) => {
				expect(res.status).toBe(201);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("parking", expect.any(Object));
				expect(res.body.parking).toHaveProperty("id", expect.any(Number));
				expect(res.body.parking).toHaveProperty("type", expect.any(String));
				expect(res.body.parking).toHaveProperty("type", "Car");
				expect(res.body.parking).toHaveProperty("timeIn", expect.any(String));
				expect(res.body.parking).toHaveProperty("timeIn", "2023-01-04T10:25");
				expect(res.body.parking).toHaveProperty("timeOut", expect.any(String));
				expect(res.body.parking).toHaveProperty("timeOut", "2023-01-04T12:25");
				expect(res.body.parking).toHaveProperty("price", expect.any(Number));
				expect(res.body.parking).toHaveProperty("price", 10000);
			});
	});

	test("POST /parkings - fail without type test", () => {
		return request(app)
			.post("/parkings")
			.send({
				type: "",
				timeIn: "2023-01-04T10:25",
				timeOut: "2023-01-04T12:25",
				price: 10000,
			})
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", "Type is required");
			});
	});

	test("POST /parkings - fail without timeIn test", () => {
		return request(app)
			.post("/parkings")
			.send({
				type: "Car",
				timeIn: "",
				timeOut: "2023-01-04T12:25",
			})
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", "Time In is required");
			});
	});

	test("POST /parkings - fail without timeOut test", () => {
		return request(app)
			.post("/parkings")
			.send({
				type: "Car",
				timeIn: "2023-01-04T10:25",
				timeOut: "",
			})
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", "Time Out is required");
			});
	});

	test("POST /parkings - fail with same timeIn & timeOut test", () => {
		return request(app)
			.post("/parkings")
			.send({
				type: "Car",
				timeIn: "2023-01-04T10:25",
				timeOut: "2023-01-04T10:25",
			})
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.body).toBeInstanceOf(Object);
				expect(res.body).toHaveProperty("message", expect.any(String));
				expect(res.body).toHaveProperty("message", "Invalid Input");
			});
	});
});
