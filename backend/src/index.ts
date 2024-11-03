import { creatApp } from "./app";
import { createFlashcardRepository, createFlashcardRouter } from "./flashcards";
import {
  createUserRepository,
  createUserRouter,
  createUserService,
} from "./users";

const flashcardRepository = createFlashcardRepository([]);
const flashcardRouter = createFlashcardRouter(flashcardRepository);

const userRepository = createUserRepository([]);
const userService = createUserService(userRepository);
const userRouter = createUserRouter(userService);

export const app = creatApp(flashcardRouter, userRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
