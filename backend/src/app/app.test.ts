import test from "node:test";
import { deepEqual } from "node:assert/strict";
import request from "supertest";
import { creatApp } from ".";

test("App is up and running", async () => {
  const app = creatApp();
  const response = await request(app).get("/");

  deepEqual(response.status, 200);
});

test("GET api/flashcards returns empty array of flashcards", async () => {
  const app = creatApp();
  const response = await request(app).get("/api/flashcards");

  deepEqual(response.status, 200);
  deepEqual(response.body, []);
});
