import { Request, Response } from "express";
import { chatType } from "./type";
import {
  createChatAiSearchService,
  createChatResourceSearchService,
} from "./service";

export async function createResourceSearchChatController(
  req: Request,
  res: Response,
) {
  const chatToBeCreated: chatType = req.body;
  try {
    const savedChat = await createChatResourceSearchService(chatToBeCreated);
    console.log("Saved chat", savedChat);

    res.status(200).send(savedChat);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Chat Creation failed", error: error.message });
  }
}

export async function createAiSearchChatController(
  req: Request,
  res: Response,
) {
  const chatToBeCreated: chatType = req.body;
  try {
    const savedURL = await createChatAiSearchService(chatToBeCreated);
    res.status(200).send(savedURL);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Chat Creation failed", error: error.message });
  }
}
