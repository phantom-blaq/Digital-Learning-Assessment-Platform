import { Request, Response } from "express";
import {
  finalResourceSchema,
  resourceBodyType,
} from "../schemas/resource.schema";
import { userResourceModel, UserResourceDoc } from "../models/resourceModel";

export const createResource = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Validate body
    const body: resourceBodyType = finalResourceSchema.parse(req.body);

    // 2️⃣ Get userId from auth middleware (never trust body)
    const userId = (req as any).user.id;

    // 3️⃣ Check duplicate resource for same user
    const existingResource: UserResourceDoc | null =
      await userResourceModel.findOne({
        title: body.title,
        ownerId: userId,
      });

    if (existingResource) {
      return res.status(409).json({
        message: "Resource with this title already exists",
      });
    }

    // 4️⃣ Create resource
    const newUserResource: UserResourceDoc = await userResourceModel.create({
      ...body,
      ownerId: userId,
    });

    // 5️⃣ Send response
    return res.status(201).json({
      message: "Resource created successfully",
      data: newUserResource,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create resource",
      error: error.message,
    });
  }
};
