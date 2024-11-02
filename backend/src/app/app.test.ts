import test, { beforeEach } from "node:test";
import { deepEqual } from "node:assert/strict";
import request from "supertest";
import { creatApp } from ".";
import { createRepository, createRouter, Flashcard } from "../flashcards";

function setUpApp(db: Array<Flashcard>) {
  const flashcardsRepository = createRepository(db);
  const flashcardsRouter = createRouter(flashcardsRepository);
  const app = creatApp(flashcardsRouter);
  return app;
}

test("App is up and running", async () => {
  const app = setUpApp([]);
  const response = await request(app).get("/");

  deepEqual(response.status, 200);
});

test("GET api/flashcards returns empty array of flashcards", async () => {
  const app = setUpApp([]);
  const response = await request(app).get("/api/flashcards");

  deepEqual(response.status, 200);
  deepEqual(response.body, []);
});

test("POST api/flashcards adds a flashcard", async () => {
  const app = setUpApp([]);

  const postFlashcard = { question: "What's up?", answer: "I'm fine!" };
  const response = await request(app)
    .post("/api/flashcards")
    .send(postFlashcard);

  const flashcards = (await request(app).get("/api/flashcards")).body;
  const flashcard = flashcards[0];

  deepEqual(response.status, 201);
  deepEqual(flashcards.length, 1);
  deepEqual(flashcard.question, postFlashcard.question);
  deepEqual(flashcard.answer, postFlashcard.answer);
});

test("POST api/flashcards returns 400 if invalid body provided", async () => {
  const app = setUpApp([]);

  const postFlashcard = { question: "What's up?" };
  const response = await request(app)
    .post("/api/flashcards")
    .send(postFlashcard);

  deepEqual(response.status, 400);
});
