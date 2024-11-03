import z from "zod";

export const Flashcard = z
  .object({
    id: z.string().uuid(),
    question: z.string().min(1),
    answer: z.string().min(1),
  })
  .strict();

export type Flashcard = z.infer<typeof Flashcard>;

export const Update = Flashcard.omit({ id: true })
  .partial()
  .refine(
    ({ question, answer }) =>
      ![question, answer].every((item) => item === undefined),
    { message: "At least one of 'question' or 'answer' must be provided." }
  );

export type Update = z.infer<typeof Update>;
