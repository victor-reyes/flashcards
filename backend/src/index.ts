import { creatApp } from "./app";

export const app = creatApp();

const port = 4444;
app.listen(port, () => {
  console.log(`The server is up and running on port ${port}`);
});
