import { Router } from "express";
import { getUserSolvedQuizzes, getQuizById } from "../controllers/QuizController";
import { login, register } from "../controllers/AuthController";
import { toggleUserSolvedQuiz } from "../controllers/QuizController";
import { getWordOfTheDay, sentenceOfTheDay } from "../controllers/WSOTDController";

const router = Router();

// API Welcome Message
router.get("/", (_, response) => {
  response.send({
    message: "My-API-Name v0.0.1",
  });
});

router.post("/login", login);
router.post("/register", register);

const quizRouter = Router();

quizRouter.get("/:userId/solved-quizzes", getUserSolvedQuizzes);
quizRouter.get("/:id", getQuizById);
quizRouter.post("/:userId/:quizId/toggle-solved", toggleUserSolvedQuiz);

router.use("/quiz", quizRouter);

const wordRouter = Router();

wordRouter.post("/wotd", getWordOfTheDay);
wordRouter.post("/sotd", sentenceOfTheDay);

router.use("/word", wordRouter);

/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */

export default router;
