import { createChatType, chatType } from "./type";
import { prisma } from "../../lib/prisma";

export async function createChatResourceSearchService(
  resourceChatToBeCreated: createChatType,
) {
  try {
    const resourceChatCreatedInDB = await prisma.chat.create({
      data: {
        profileId: resourceChatToBeCreated.profileId,
        groupId: resourceChatToBeCreated.groupId,
        // searchType: resourceChatToBeCreated.searchType,
      },
    });

    return { resourceChatCreatedInDB };
  } catch (error) {
    console.error("Error in Saving Resource Search Chat", error);
  }
}

export async function createChatAiSearchService(
  AiChatToBeCreated: createChatType,
) {
  try {
    const AiChatCreatedInDB = await prisma.chat.create({
      data: {
        profileId: AiChatToBeCreated.profileId,
        groupId: AiChatToBeCreated.groupId,
        // searchType: AiChatToBeCreated.searchType,
      },
    });

    return { AiChatCreatedInDB };
  } catch (error) {
    console.error("Error in Saving Ai Search Chat", error);
  }
}
