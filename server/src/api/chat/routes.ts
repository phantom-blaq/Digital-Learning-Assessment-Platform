import { Router } from "express";

import {
  createAiSearchChatController,
  createResourceSearchChatController,
} from "./controller";
import authMiddleware from "../../middleware/authMiddleware";
const router = Router();

router.post(
  "/resourceSearch",
  authMiddleware,
  createResourceSearchChatController,
);
router.post("/aiSearch", authMiddleware, createAiSearchChatController);

export default router;
