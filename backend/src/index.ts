import { creatApp } from "./app";
import { createRepository, createRouter, Flashcard } from "./flashcards";

const flashcardsRepository = createRepository(new Array<Flashcard>);
const flashcardsRouter = createRouter(flashcardsRepository);
export const app = creatApp(flashcardsRouter);

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
