import express from "express";
import * as GroupsController from "../controllers/groups";

const router = express.Router();

router.get("/", GroupsController.getGroups);
router.get("/:groupId", GroupsController.getGroup);

router.post("/", GroupsController.createGroup);
router.patch("/:groupId", GroupsController.updateGroup);
router.delete("/:groupId", GroupsController.deleteGroup);

router.patch("/addUser/:groupId", GroupsController.addUserToGroup);
router.patch("/remUser/:groupId", GroupsController.removeUserFromGroup);

router.patch("/addCat/:groupId", GroupsController.addCategory);
router.patch("/remCat/:groupId", GroupsController.removeCategoryFromGroup);

export default router;