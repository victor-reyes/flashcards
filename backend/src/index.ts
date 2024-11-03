import { creatApp } from "./app";
import {
  createFlashcardRouter,
  createFlashcardService,
  createFlashcardRepository,
} from "./flashcards";
import {
  createUserRepository,
  createUserRouter,
  createUserService,
} from "./users";

const flashcardRepository = createFlashcardRepository([]);
const flashcardService = createFlashcardService(flashcardRepository);
const flashcardRouter = createFlashcardRouter(flashcardService);

const userRepository = createUserRepository([]);
const userService = createUserService(userRepository);
const userRouter = createUserRouter(userService);

export const app = creatApp(flashcardRouter, userRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
