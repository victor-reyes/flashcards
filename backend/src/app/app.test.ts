import test, { beforeEach } from "node:test";
import { deepEqual } from "node:assert/strict";
import request from "supertest";
import { creatApp } from ".";
import { createRepository, createRouter } from "../flashcards";
import { App } from "supertest/types";

let app: App;
const TEST_FLASHCARD = {
  id: "test_id",
  question: "Capital of Great Britain",
  answer: "London",
};
const TEST_DB = [{ ...TEST_FLASHCARD }];

beforeEach(async () => {
  const flashcardsRepository = createRepository([...TEST_DB]);
  const flashcardsRouter = createRouter(flashcardsRepository);
  app = creatApp(flashcardsRouter);
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
    `/api/flashcards/${TEST_FLASHCARD.id}`
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
  const flashcard = flashcards[1];

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
    `/api/flashcards/${flashcardToDelete.id}`
  );

  const flashcards = (await request(app).get("/api/flashcards")).body;
  flashcards.includes(flashcardToDelete);

  deepEqual(response.status, 204);
  deepEqual(flashcards.length, 0);
  deepEqual(flashcards.includes(flashcardToDelete), false);
});
