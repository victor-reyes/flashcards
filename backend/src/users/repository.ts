import { Db, Repository, User } from ".";

export function createUserRepository(db: Db): Repository {
  return {
    async register(user: User): Promise<boolean> {
      if (isUserAlreadyExist(db, user)) return false;
      db.push(user);
      return true;
    },

    async login(user: User) {
      if (isUserAlreadyExist(db, user)) return "welcome";
    },
  };
}

function isUserAlreadyExist(users: User[], newUser: User): boolean {
  return (
    users.find(
      (user) =>
        user.email === newUser.email || user.username === newUser.password
    ) !== undefined
  );
}
