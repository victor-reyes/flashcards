import { Service, User } from ".";

export type Repository = {
  save: (user: User) => Promise<void>;
  getAll: () => Promise<User[]>;
};

export function createUserService(repository: Repository): Service {
  return {
    async register(user: User): Promise<boolean> {
      user = parse(user);

      const users = await repository.getAll();

      validateNewUser(users, user);

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

export function validateNewUser(users: User[], user: User) {
  if (isUserAlreadyRegistred(users, user))
    throw {
      name: "ValidationError",
      message: "User with such email is already registered",
    };

  if (isUserNameTaken(users, user))
    throw {
      name: "ValidationError",
      message: `"${user.username}" is taken by another user`,
    };
}

function isUserAlreadyRegistred(users: User[], user: User) {
  return users.some(({ email }) => email === user.email);
}

function isUserNameTaken(users: User[], user: User) {
  return users.some(({ username }) => username === user.username);
}
