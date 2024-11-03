import { deepEqual, throws, doesNotThrow } from "node:assert/strict";
import test, { describe } from "node:test";
import { validateNewUser, parse } from "./service";
import { ZodError } from "zod";

const existingUser = {
  email: "email@email.com",
  password: "password",
  username: "username",
};

const nonExistingUser = {
  email: "fake@email.com",
  password: "password",
  username: "fake",
};
const users = [existingUser];

describe("Helper functions in User Service", async () => {
  test("should throw if user's email is registered or if username is taken", async () => {
    const userWithRegistredEmail = {
      ...nonExistingUser,
      email: existingUser.email,
    };
    const userWithTakenUsername = {
      ...nonExistingUser,
      username: existingUser.username,
    };

    doesNotThrow(() => validateNewUser(users, nonExistingUser));
    throws(() => validateNewUser(users, userWithRegistredEmail), {
      name: "ValidationError",
      message: "User with such email is already registered",
    });

    throws(() => validateNewUser(users, userWithTakenUsername), {
      name: "ValidationError",
      message: `"${userWithTakenUsername.username}" is taken by another user`,
    });
  });

  test("should parse valid User successfully and throw otherwise", async () => {
    const goodUser = existingUser;

    const { email, ...userWithoutEmail } = goodUser;
    const userWithShortPassword = { ...goodUser, password: "short" };

    deepEqual(parse(goodUser), goodUser);
    throws(() => parse(userWithoutEmail as any), ZodError);
    throws(() => parse(userWithShortPassword), ZodError);
  });
});
