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

      if (validateNewUser(users, user)) return false;
      await repository.save(user);
      return true;
    },

    async login(user: User) {
      user = parse(user);

      const users = await repository.getAll();

      if (validateNewUser(users, user)) return user.username;
    },
  };
}

export function parse(user: User) {
  return User.parse(user);
}

export function validateNewUser(users: User[], user: User): boolean {
  return (
    users.find(
      ({ email, username }) =>
        email === user.email || username === user.username
    ) !== undefined
  );
}
