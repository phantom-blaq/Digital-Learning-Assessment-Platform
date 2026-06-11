import { z } from "zod";

// Base fields shared across all source types
export const baseChatSchema = z.object({
  id: z.string(),
  profileId: z.string(),
  //   searchType: z.enum(["AISEARCH", "RESOURCESEARCH"]),
  groupId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type chatType = z.infer<typeof baseChatSchema>;

export const createChatSchema = baseChatSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type createChatType = z.infer<typeof createChatSchema>;
