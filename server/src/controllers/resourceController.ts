import { Request, Response } from "express";
import {
  finalResourceSchema,
  resourceBodyType,
} from "../schemas/resource.schema";
import { userResourceModel, UserResourceDoc } from "../models/resourceModel";
import { auth } from "../middleware/auth.middleware";
export const createResource = async (req: Request, res: Response) => {
  try {
    const body: resourceBodyType = finalResourceSchema.parse(req.body);

    const newUserResource: UserResourceDoc =
      await userResourceModel.create(body);

    console.log("new user", auth, newUserResource);

    res.status(201).json({ newUserResource });
  } catch (error) {
    console.error(error);
  }
};
