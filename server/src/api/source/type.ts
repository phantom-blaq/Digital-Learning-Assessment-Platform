import { z } from "zod";

// Base fields shared across all source types
const baseSourceSchema = z.object({
  title: z.string().optional(),
  profileId: z.string(),
  type: z.enum(["CARD", "URL", "DOCUMENT"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Card Source
export const cardSourceSchema = baseSourceSchema.extend({
  body: z.string(),
});

// URL Source
export const urlSourceSchema = baseSourceSchema.extend({
  url: z.string(),
});

// Document Source
export const documentSourceSchema = baseSourceSchema.extend({
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
