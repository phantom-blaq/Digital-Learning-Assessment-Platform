import { Request, Response } from "express";
import { CardSource, UrlSource } from "./type";
import { createCardService, createURLService } from "./service";

export async function createCardController(req: Request, res: Response) {
  const cardToBeCreated: CardSource = req.body;
  try {
    const savedCard = await createCardService(cardToBeCreated);

    res.status(200).send(savedCard);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Registration failed", error: error.message });
  }
}

export async function createURLController(req: Request, res: Response) {
  const URLToBeCreated: UrlSource = req.body;
  try {
    const savedURL = await createURLService(URLToBeCreated);
    res.status(200).send(savedURL);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Registration failed", error: error.message });
  }
}
