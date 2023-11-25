import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.post("/all", NotesController.getNotes);
router.get("/:noteId", NotesController.getNote);
router.post("/", NotesController.createNote);
router.post("/:groupId", NotesController.createNote);
router.patch("/:noteId", NotesController.updateNote);
router.delete("/:noteId", NotesController.deleteNote);
router.delete("/:noteId/:groupId", NotesController.deleteNote);

export default router;