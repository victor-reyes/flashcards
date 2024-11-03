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

  test("should successfully parse a valid User object", async () => {
    const validUser = existingUser;

    const result = parse(validUser);

    deepEqual(result, validUser);
  });

  test("should throw an error when parsing an empty User object", async () => {
    const emptyUser = {};

    throws(() => parse(emptyUser as any), ZodError);
  });

  test("should throw an error when parsing a User object without an email", async () => {
    const { email, ...userWithoutEmail } = existingUser;

    throws(() => parse(userWithoutEmail as any), ZodError);
  });

  test("should throw an error when parsing a User object with a too short password", async () => {
    const userWithShortPassword = { ...existingUser, password: "short" };

    throws(() => parse(userWithShortPassword), ZodError);
  });
});
