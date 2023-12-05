const { faker } = require("@faker-js/faker");
const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const Role = require("../models/Role");
const User = require("../models/User");
const app = express();
// require("../config/dbConfig")();

app.use(cookieParser());
app.use(express.json());
app.use("/auth", require("../routes/authRoutes"));

let email         = faker.internet.email();
let full_name     = faker.person.fullName();
let phone_number  = faker.phone.number();

const cookies = {
  accessToken: "the-access-token-value",
  refreshToken: "the-refresh-token-value",
};

describe("register function", () => {
  it("should return a 401 response if the user is logged in", async () => {
    const body = {};
    const response = await request(app)
      .post("/auth/register")
      .set(
        "Cookie",
        `accessToken=${cookies.accessToken}; refreshToken=${cookies.refreshToken}`
      )
      .send(body);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Action denied, you are logged in",
    });
  });

  it("should return a 400 response if any required field is missing", async () => {
    const body = {};
    const response = await request(app).post("/auth/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "All fields are required" });
  });

  it("should return a 400 response if the passwords are not the same", async () => {
    const body = {
      email,
      full_name,
      password: "password123",
      password_confirmation: "password456",
      phone_number,
      address: "123 Main St",
      role: "Client",
    };
    const response = await request(app).post("/auth/register").send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Passwords do not match" });
  });

  it("should return a 400 response if Role is invalid", async () => {
    const body = {
      email,
      full_name,
      password: "password123",
      password_confirmation: "password123",
      phone_number,
      address: "123 Main St",
      role: "Manager",
    };
    const response = await request(app).post("/auth/register").send(body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: "Invalid Role" });
  });

  it("should return a 409 response if Email already token", async () => {
    Role.findOne = jest.fn().mockResolvedValue({});
    User.findOne = jest.fn().mockResolvedValue({ email: true });
    const body = {
      email,
      full_name,
      password: "password123",
      password_confirmation: "password123",
      phone_number,
      address: "123 Main St",
      role: "Client",
    };
    const response = await request(app).post("/auth/register").send(body);

    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({ message: "Email already token" });
  });

  // it("should return a 201 response if User inserted", async () => {
  //   Role.findOne = jest.fn().mockResolvedValue({});
  //   User.findOne = jest.fn().mockResolvedValue(null);
  //   User.save = jest.fn().mockResolvedValue(true);

  //   const body = {
  //     email,
  //     full_name,
  //     password: "password123",
  //     password_confirmation: "password123",
  //     phone_number,
  //     address: "123 Main St",
  //     role: "Client",
  //   };
  //   const response = await request(app).post("/auth/register").send(body);

  //   expect(response.statusCode).toBe(201);
  //   expect(response.body).toMatchObject({
  //     message: "User has been added",
  //     user: expect.any(Object),
  //   });
  // });
});