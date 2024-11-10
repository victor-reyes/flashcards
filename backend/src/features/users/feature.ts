import { createUserRepository } from "./repository";
import { createUserRouter } from "./router";
import { createUserService } from "./service";
import { User } from "./types";

export function createUserFeature(db: User[]) {
  const userRepository = createUserRepository(db);
  const userService = createUserService(userRepository);
  const userRouter = createUserRouter(userService);

  return { userRepository, userService, userRouter };
}
