import { Router } from "express";
import { createResource } from "../controllers/resourceController";
import { auth } from "../middleware/auth.middleware";
const router = Router();

router.post("/", auth, createResource);
// router.post("/login", login);

export default router;
