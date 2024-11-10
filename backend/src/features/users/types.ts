import z from "zod";

export const User = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});

export type User = z.infer<typeof User>;

export type Db = User[];
