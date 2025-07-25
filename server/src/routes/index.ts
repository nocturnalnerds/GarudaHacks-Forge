import { Router } from "express";
import { getUserSolvedQuizzes, getQuizById, getQuizList, getTestQuestion, checkTestQuestionAnswer } from "../controllers/QuizController";
import { login, register } from "../controllers/AuthController";
import { toggleUserSolvedQuiz } from "../controllers/QuizController";
import { getWordOfTheDay, sentenceOfTheDay } from "../controllers/WSOTDController";
import { sendRequestToAI } from "../controllers/ChatController";
import { onHitTTS } from "../utils/TTS";

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

router.use("/quiz", quizRouter);

quizRouter.get("/solved-quizes/:userId/:difficulty/:language", getUserSolvedQuizzes);
quizRouter.get("/:id", getQuizById);
quizRouter.post("/:userId/:quizId", toggleUserSolvedQuiz);
quizRouter.get("/list-quizes/:userId/:difficulty/:language", getQuizList);
quizRouter.get("/testQuestion/:language/:difficulty", getTestQuestion);
quizRouter.post("/checkTestQuestionAnswer", checkTestQuestionAnswer);
quizRouter.post("/tts", onHitTTS);
const wordRouter = Router();

wordRouter.post("/wotd", getWordOfTheDay);
wordRouter.post("/sotd", sentenceOfTheDay);

router.use("/word", wordRouter);

router.post("/chatAI/:lang/:userId", sendRequestToAI)



/**
 * Insert your router here
 * @example router.use("/example", exampleRouter)
 */

export default router;
