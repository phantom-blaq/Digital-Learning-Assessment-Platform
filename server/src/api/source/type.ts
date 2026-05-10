import { z } from "zod";

// Base fields shared across all source types
const baseSourceSchema = z.object({
  title: z.string().optional(),
  profileId: z.string(),
});

// Card Source
export const cardSourceSchema = baseSourceSchema.extend({
  type: z.literal("CARD"),
  body: z.string(),
});

// URL Source
export const urlSourceSchema = baseSourceSchema.extend({
  type: z.literal("URL"),
  url: z.string(),
});

// Document Source
export const documentSourceSchema = baseSourceSchema.extend({
  type: z.literal("DOCUMENT"),
  documentId: z.string(),
});

// Discriminated Union
export const sourceSchema = z.discriminatedUnion("type", [
  cardSourceSchema,
  urlSourceSchema,
  documentSourceSchema,
]);

// Types
export type CardSource = z.infer<typeof cardSourceSchema>;
export type UrlSource = z.infer<typeof urlSourceSchema>;
export type DocumentSource = z.infer<typeof documentSourceSchema>;

export type Source = z.infer<typeof sourceSchema>;
