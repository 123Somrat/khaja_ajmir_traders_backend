import request from "supertest";
import { httpserver } from "../../../src";
import { MongoMemoryServer } from "mongodb-memory-server";
import dueService from "../../../src/lib/due";
import mongoose from "mongoose";
import HttpError from "../../../src/utils/customError";
let mongoServer: MongoMemoryServer;

describe("GET /api/v1/dues", () => {  
   
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    httpserver.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  });

  it("If dues collections are empty then its return empty array with default query params", async () => {
    const res = await request(httpserver)
      .get("/api/v1/dues")
      .query({ page: 0, limit: 0, sortBy: "", sortType: "", searchBy: "" });
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body).toHaveProperty("hateOsLinks");
    expect(res.body.data).toHaveLength(0);
    expect(res.body.meta).toHaveProperty("totalItems");
  });

  it("Should return empty array with invalid query params", async () => {
    const res = await request(httpserver).get("/api/v1/dues").query({
      page: -1,
      limit: -1,
      sortBy: "invalid",
      sortType: "invalid",
      searchBy: "invalid",
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body).toHaveProperty("hateOsLinks");
    expect(res.body.data).toHaveLength(0);
  });

  it("Shuld return all dues with valid query params", async () => {
    const res = await request(httpserver).get("/api/v1/dues").query({
      page: 1,
      limit: 10,
      sortBy: "expiredDate",
      sortType: "asc",
      searchBy: "sellerName",
    });

    expect(res.status).toEqual(200);
    expect(res.body.data).toHaveLength(0);
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("meta");
    expect(res.body).toHaveProperty("hateOsLinks");
  });



  it("Should return all dues with invalid query params", async () => {

      const res = await request(httpserver).get("/api/v1/dues").query({
        page: -1,
        limit: 10,
        sortBy: "createdAt",
        sortType: "asc",
        searchBy: "invalid",
      });
      

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("code");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("meta");
      expect(res.body).toHaveProperty("hateOsLinks");
      expect(res.body.data).toHaveLength(0);
  })


  it("should return 500 if there is an internal server error", async () => {
    // 🛑 Mock the service to simulate an error
    jest
      .spyOn(dueService, "allDues")
      .mockRejectedValue(
        new HttpError(
          500,
          "Internal server error",
          "An unexpected error occurred"
        )
      );

    const res = await request(httpserver).get("/api/v1/dues").query({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortType: "asc",
    });

    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty("code", "Internal server error");
    expect(res.body).toHaveProperty("message", "An unexpected error occurred");

    // ✅ Restore the original implementation after test
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    jest.clearAllTimers();
    await mongoose.connection.dropDatabase();
    await new Promise<void>((resolve) => httpserver.close(() => resolve())); // ✅ Wait for server to close
    await mongoose.connection.close(); // ✅ Close database connection
    await mongoServer.stop();

    console.log("📌 Server and DB connections closed");
  });
});
