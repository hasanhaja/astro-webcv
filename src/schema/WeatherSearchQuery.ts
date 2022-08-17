import { z } from "zod";

export const WeatherSearchQuery = z.object({
  city: z.string().trim(),
  country: z.string().optional(),
});

export type WeatherSearchQueryType = z.infer<typeof WeatherSearchQuery>;