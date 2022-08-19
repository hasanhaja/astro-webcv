import { z } from "zod";

export const Form = z.string().trim();
export type FormType = z.infer<typeof Form>;