import { CardSource, UrlSource } from "./type";
import { prisma } from "../../lib/prisma";

export async function createCardService(cardToBeCreated: CardSource) {
  try {
    const cardSavedInDB = await prisma.source.create({
      data: {
        profileId: cardToBeCreated.profileId,
        title: cardToBeCreated.title ?? null,
        type: cardToBeCreated.type,
        body: cardToBeCreated.body,
      },
    });
    console.log("card Saved Successfully in DB", cardSavedInDB);
    return { cardSavedInDB };
  } catch (error) {
    console.error("Error in Saving CARD", error);
  }
}

export async function createURLService(URLToBeCreated: UrlSource) {
  try {
    const URLSavedInDB = await prisma.source.create({
      data: {
        profileId: URLToBeCreated.profileId,
        title: URLToBeCreated.title ?? null,
        type: URLToBeCreated.type,
      },
    });
    console.log("card Saved Successfully in DB", URLSavedInDB);
    return { URLSavedInDB };
  } catch (error) {
    console.error("Error in Saving URL", error);
  }
}
