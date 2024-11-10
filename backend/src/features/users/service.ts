import { Repository } from "./repository";
import { User } from "./types";

export type Service = {
  register: (user: User) => Promise<boolean>;
  login: (user: User) => Promise<string | undefined>;
};

export function createUserService(repository: Repository): Service {
  return {
    async register(user: User): Promise<boolean> {
      user = parse(user);

      const users = await repository.getAll();

      ensureUserIsUnique(users, user);

      await repository.save(user);
      return true;
    },

    async login(user: User) {
      user = parse(user);

      const users = await repository.getAll();

      if (authenticateUser(users, user)) return user.username;
    },
  };
}

export function parse(user: User) {
  return User.parse(user);
}

function authenticateUser(users: User[], user: User) {
  return users.some(
    ({ email, password }) => user.email === email && user.password === password,
  );
}

export function ensureUserIsUnique(users: User[], user: User) {
  if (isEmailAlreadyRegistered(users, user))
    throw {
      name: "ValidationError",
      message: "User with such email is already registered",
    };

  if (isUsernameAlreadyTaken(users, user))
    throw {
      name: "ValidationError",
      message: `"${user.username}" is taken by another user`,
    };
}

function isEmailAlreadyRegistered(users: User[], user: User) {
  return users.some(({ email }) => email === user.email);
}

function isUsernameAlreadyTaken(users: User[], user: User) {
  return users.some(({ username }) => username === user.username);
}
