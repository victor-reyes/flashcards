import test from "node:test";
import { deepEqual } from "node:assert/strict";
import request from "supertest";

test("App is up and running", async () => {
  const app = creatApp();
  const response = await request(app).get("/");

  deepEqual(response.status, 200);
});
