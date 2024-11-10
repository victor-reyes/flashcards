import { deepEqual, throws, doesNotThrow } from "node:assert/strict";
import test, { describe } from "node:test";
import { ensureUserIsUnique, parse } from "./service";
import { ZodError } from "zod";

const existingUser = {
  email: "email@email.com",
  password: "password",
  username: "username",
};

const newUser = {
  email: "fake@email.com",
  password: "password",
  username: "fake",
};
const users = [existingUser];

describe("Helper functions in User Service", async () => {
  test("should not throw when a new user with a unique email and username registers", async () => {
    doesNotThrow(() => ensureUserIsUnique(users, newUser));
  });

  test("should throw when the user's email is already registered", async () => {
    const userWithDuplicateEmail = {
      ...newUser,
      email: existingUser.email,
    };
    throws(() => ensureUserIsUnique(users, userWithDuplicateEmail), {
      name: "ValidationError",
      message: "User with such email is already registered",
    });
  });

  test("should throw when the user's username is already taken", async () => {
    const userWithDuplicateUsername = {
      ...newUser,
      username: existingUser.username,
    };

    throws(() => ensureUserIsUnique(users, userWithDuplicateUsername), {
      name: "ValidationError",
      message: `"${userWithDuplicateUsername.username}" is taken by another user`,
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
