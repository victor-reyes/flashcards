import { creatApp } from "./app";
import { createRepository, createRouter, Flashcard } from "./flashcards";
import { createUserRepository, createUserRouter } from "./users";

const flashcardsRepository = createRepository(new Array<Flashcard>());
const flashcardsRouter = createRouter(flashcardsRepository);

const userRepository = createUserRepository(new Set());
const userRouter = createUserRouter(userRepository);

export const app = creatApp(flashcardsRouter, userRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
