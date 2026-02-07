import mongoose from "mongoose";
import { Document } from "mongoose";

export type ScopeType = "WORKSPACE" | "PRIVATE";
export type ResourceType = "URL" | "DOCUMENT" | "CARD";

export interface IUserResource extends Document {
  title: string;
  ownerId: string;
  scope: ScopeType;
  workspaceId?: string;
  resourceType: ResourceType;
  url?: string;
  fileType?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userResourceSchema = new mongoose.Schema<IUserResource>(
  {
    title: { type: String, required: true },

    ownerId: { type: String, required: true, index: true },

    scope: {
      type: String,
      enum: ["WORKSPACE", "PRIVATE"],
      required: true,
      index: true,
    },

    workspaceId: {
      type: String,

      index: true,
    },

    resourceType: {
      type: String,
      enum: ["URL", "DOCUMENT", "CARD"],
      required: true,
      index: true,
    },

    url: { type: String },

    fileType: { type: String },

    content: { type: String },
  },
  { timestamps: true },
);

export const userResourceModel = mongoose.model<IUserResource>(
  "userResource",
  userResourceSchema,
);
