
import express from "express";
import { createForm, getFormById, getForms, updateForm, deleteForm } from "../controllers/formController.js";

const router = express.Router();

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
