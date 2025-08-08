
import express from "express";
import { submitResponse, getResponsesByFormId } from "../controllers/responseController.js";

const router = express.Router();

router.post("/", submitResponse);
router.get("/:formId", getResponsesByFormId);

export default router;
