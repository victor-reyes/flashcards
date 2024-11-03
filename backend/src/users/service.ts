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

      if (doesUserAlreadyExist(users, user)) return false;
      repository.save(user);
      return true;
    },

    async login(user: User) {
      user = parse(user);

      const users = await repository.getAll();

      if (doesUserAlreadyExist(users, user)) return user.username;
    },
  };
}

function parse(user: User) {
  return User.parse(user);
}
function doesUserAlreadyExist(users: User[], user: User): boolean {
  return (
    users.find(
      ({ email, username }) =>
        email === user.email || username === user.username
    ) !== undefined
  );
}
