import { Router } from "express";

import { createCardController, createURLController } from "./controller";
import authMiddleware from "../../middleware/authMiddleware";
const router = Router();

router.post("/card", authMiddleware, createCardController);
router.post("/url", authMiddleware, createURLController);

export default router;
