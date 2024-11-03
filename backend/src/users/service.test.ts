import { deepEqual, throws } from "node:assert/strict";
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
  test("should return true when user exist and false otherwise", async () => {
    const exist = validateNewUser(users, existingUser);
    const notExist = validateNewUser(users, nonExistingUser);

    deepEqual(exist, true);
    deepEqual(notExist, false);
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
