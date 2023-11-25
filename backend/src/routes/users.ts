import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.patch("/addCat", requiresAuth, UserController.addCategory);
router.patch("/remCat", requiresAuth, UserController.removeCategory);

export default router;