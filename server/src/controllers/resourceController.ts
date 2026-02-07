import { Request, Response } from "express";
import {
  finalResourceSchema,
  resourceBodyType,
} from "../schemas/resource.schema";
import { userResourceModel, IUserResource } from "../models/resourceModel";

export const createResource = async (req: Request, res: Response) => {
  const body: resourceBodyType = finalResourceSchema.parse(req.body);

  const newUserResource: IUserResource = await userResourceModel.create(body);
};
