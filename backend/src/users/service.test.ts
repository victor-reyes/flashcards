import { deepEqual } from "node:assert/strict";
import test, { describe } from "node:test";
import { doesUserAlreadyExist } from "./service";

describe("Helper functions in User Service", async () => {
  test("should return true when user exist and false otherwise", async () => {
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

    const exist = doesUserAlreadyExist(users, existingUser);
    const notExist = doesUserAlreadyExist(users, nonExistingUser);

    deepEqual(exist, true);
    deepEqual(notExist, false);
  });
});
