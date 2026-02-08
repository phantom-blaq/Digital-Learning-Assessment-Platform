import { z } from "zod";

export const ScopeEnum = z.enum(["WORKSPACE", "PRIVATE"]);
export const ResourceTypeEnum = z.enum(["URL", "DOCUMENT", "CARD"]);

export const baseResourceSchema = z.object({
  title: z.string().min(1),
  ownerId: z.string(),
  scope: ScopeEnum,
  // workspaceId: z.string().optional(),
  resourceType: ResourceTypeEnum,
});

export const documentResourceSchema = baseResourceSchema.extend({
  resourceType: z.literal("DOCUMENT"),
  fileType: z.string().min(1),
});

export const URLResourceSchema = baseResourceSchema.extend({
  resourceType: z.literal("URL"),
  url: z.url(),
});

export const cardResourceSchema = baseResourceSchema.extend({
  resourceType: z.literal("CARD"),
  content: z.string().min(1),
});

export const finalResourceSchema = z.discriminatedUnion("resourceType", [
  cardResourceSchema,
  documentResourceSchema,
  URLResourceSchema,
]);

export type resourceBodyType = z.infer<typeof finalResourceSchema>;
