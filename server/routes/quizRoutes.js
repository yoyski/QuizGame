import express from "express";
import { createQuiz, getMyQuizzes, getAllQuizzes, getQuizById, updateQuiz, deleteQuiz } from "../controllers/quizController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/my", protect, getMyQuizzes);
router.get("/:id", getQuizById);
router.post("/", protect, createQuiz);
router.put("/:id", protect, updateQuiz);
router.delete("/:id", protect, deleteQuiz);

export default router;