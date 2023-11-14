const { faker } = require("@faker-js/faker");

const request = require("supertest");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("../config/dbConfig")();

app.use(cookieParser());
app.use(express.json());
app.use("/auth", require("../routes/authRoutes"));

jest.mock("../models/User");
const mockedUser = User;

jest.mock("bcryptjs");

jest.mock("jsonwebtoken");

let email = faker.internet.email();
const cookies = {
  accessToken: "the-access-token-value",
  refreshToken: "the-refresh-token-value",
};

describe("Authentication", () => {
  it("should verify that the user logged out", async () => {
    const body = {};

    const response = await request(app)
      .post("/auth/login")
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

  it("should verify the inputs", async () => {
    const body = {};

    const response = await request(app)
      .post("/auth/login")
      .send(body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "All fields are required" });
  });

  it("should return the email is incorrect if it is", async () => {
    const body = {
      email,
      password: "password123",
    };

    mockedUser.findOne.mockResolvedValue(null);

    const response = await request(app).post("/auth/login").send(body);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Email is not correct" });
  });

  it("should verify that the password is incorrect", async () => {
    const body = {
      email,
      password: "password123",
    };

    mockedUser.findOne.mockResolvedValue({
      _id: faker.string.alphanumeric(),
      email,
      full_name: faker.person.fullName(),
    });

    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app).post("/auth/login").send(body);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Password is not correct" });
  });

  it("should log in the user successfully", async () => {
    const body = {
      email,
      password: "password123",
    };

    mockedUser.findOne.mockResolvedValue({
      _id: faker.string.alphanumeric(),
      email,
      full_name: faker.person.fullName(),
    });

    bcrypt.compare.mockResolvedValue(true);

    jwt.sign.mockReturnValue("mockedToken");

    const response = await request(app).post("/auth/login").send(body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(expect.any(Object));
  });
});
