import z from "zod";

export const Flashcard = z.object({
  id: z.string().uuid(),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type Flashcard = z.infer<typeof Flashcard>;
