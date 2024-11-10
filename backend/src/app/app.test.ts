import test, { beforeEach } from "node:test";
import { deepEqual, match } from "node:assert/strict";
import request from "supertest";
import { App } from "supertest/types";
import { creatApp } from ".";
import { createFlaschardsFeature } from "../features/flashcards";
import { createUserFeature } from "../features/users";

let app: App;
const TEST_FLASHCARD = {
  id: "test_id",
  question: "Capital of Great Britain",
  answer: "London",
};
const TEST_USER = {
  email: "zombie@zombiland.zmb",
  password: "eatbrains",
  username: "Zombie",
};
const TEST_DB = [{ ...TEST_FLASHCARD }];
const USER_DB = [{ ...TEST_USER }];

beforeEach(async () => {
  const { flashcardRouter } = createFlaschardsFeature([...TEST_DB]);
  const { userRouter } = createUserFeature([...USER_DB]);

  app = creatApp(flashcardRouter, userRouter);
});

test("App is up and running", async () => {
  const response = await request(app).get("/");

  deepEqual(response.status, 200);
});

test("GET api/flashcards returns default array of flashcards", async () => {
  const response = await request(app).get("/api/flashcards");

  deepEqual(response.status, 200);
  deepEqual(response.body, TEST_DB);
});

test("GET api/flashcards/:id returns flaschard with that id", async () => {
  const response = await request(app).get(
    `/api/flashcards/${TEST_FLASHCARD.id}`,
  );

  deepEqual(response.status, 200);
  deepEqual(response.body, TEST_FLASHCARD);
});

test("POST api/flashcards adds a flashcard", async () => {
  const postFlashcard = { question: "What's up?", answer: "I'm fine!" };
  const response = await request(app)
    .post("/api/flashcards")
    .send(postFlashcard);

  const flashcards = (await request(app).get("/api/flashcards")).body;
  const flashcard = flashcards.slice(-1)[0];

  deepEqual(response.status, 201);
  deepEqual(flashcards.length, 2);
  deepEqual(flashcard.question, postFlashcard.question);
  deepEqual(flashcard.answer, postFlashcard.answer);
});

test("POST api/flashcards returns 400 if invalid body provided", async () => {
  const postFlashcard = { question: "What's up?" };
  const response = await request(app)
    .post("/api/flashcards")
    .send(postFlashcard);

  deepEqual(response.status, 400);
});

test("DELETE api/flashcards/:id removes a flashcard and returns 204", async () => {
  const flashcardToDelete = { ...TEST_DB[0] };
  const response = await request(app).delete(
    `/api/flashcards/${flashcardToDelete.id}`,
  );

  const flashcards = (await request(app).get("/api/flashcards")).body;
  flashcards.includes(flashcardToDelete);

  deepEqual(response.status, 204);
  deepEqual(flashcards.length, 0);
  deepEqual(flashcards.includes(flashcardToDelete), false);
});

test("PATCH api/flashcards/:id updates a flashcard and returns 204", async () => {
  const answer = "Acapulco";
  const response = await request(app)
    .patch(`/api/flashcards/${TEST_FLASHCARD.id}`)
    .send({ answer });

  const flashcard = (
    await request(app).get(`/api/flashcards/${TEST_FLASHCARD.id}`)
  ).body;

  deepEqual(response.status, 204);
  deepEqual(flashcard.answer, answer);
});

test("POST /api/users/register returns 201", async () => {
  const userToRegister = {
    email: "test@test.com",
    password: "f;ajfon:#R:J@R3",
    username: "testish",
  };

  const responce = await request(app)
    .post("/api/users/register")
    .send(userToRegister);

  deepEqual(responce.status, 201);
});

test("POST /api/users/register registering same user twice returns 400 BAD REQUEST", async () => {
  const userToRegister = {
    email: "test@test.com",
    password: "password",
    username: "testish",
  };

  await request(app).post("/api/users/register").send(userToRegister);

  const responce = await request(app)
    .post("/api/users/register")
    .send(userToRegister);

  deepEqual(responce.status, 409);
  deepEqual(responce.text, "User with such email is already registered");
});

test("POST /api/users/login returns 200 and access token", async () => {
  const userToLogin = TEST_USER;

  const responce = await request(app)
    .post("/api/users/login")
    .send(userToLogin);

  deepEqual(responce.status, 200);
  match(responce.body.accessToken, /\w+/g);
});
