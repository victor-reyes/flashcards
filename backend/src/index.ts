import { creatApp } from "./app";
import { createFlaschardsFeature } from "./features/flashcards";
import { createUserFeature as createUserFeature } from "./features/users";

const { flashcardRouter } = createFlaschardsFeature([]);
const { userRouter } = createUserFeature([]);

export const app = creatApp(flashcardRouter, userRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
