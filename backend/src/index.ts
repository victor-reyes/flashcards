import { creatApp } from "./app";
import { createFlaschardsFeature } from "./features/flashcards";
import {
  createUserRepository,
  createUserRouter,
  createUserService,
} from "./features/users";

const { flashcardRouter } = createFlaschardsFeature([]);

const userRepository = createUserRepository([]);
const userService = createUserService(userRepository);
const userRouter = createUserRouter(userService);

export const app = creatApp(flashcardRouter, userRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
