import * as request from "supertest"; 

import app from "../server"; 
describe("Pets API", () => {
  it("should get all pets", async () => {
    const res = await request.default(app).get("/api/pets");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update dietary restrictions", async () => {
    const res = await request.default(app)
  .put("/api/pets/Luna/dietaryRestrictions")
  .send({ dietaryRestrictions: ["grain-free", "low-fat"] })
  .set("Content-Type", "application/json");


    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Luna");
  });
});
