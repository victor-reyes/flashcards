import test from "node:test";
import { deepEqual } from "node:assert/strict";
import request from "supertest";
import { creatApp } from ".";
import { Flashcard } from "../flashcards";

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

test("POST api/flashcards adds a flashcard", async () => {
  const app = creatApp();

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
