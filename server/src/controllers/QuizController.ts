import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { JsonFormatResponseChat } from "../utils/jsonFormat";


const prisma = new PrismaClient();
export const getUserSolvedQuizzes = async (req: Request, res: Response) => {
    try {
        const { userId, difficulty, language } = req.params;

        const userSolved = await prisma.userSolved.findMany({
            select: { problemId: true },
            where: { userId },
        });
        console.log(userSolved);

        const allQuizzes = await prisma.quizProblems.findMany({
            where: {
                difficulty: difficulty,
                language: language || undefined,
            },
        });

        const userSolvedMap: Record<string, boolean> = {};
        for (const quiz of allQuizzes) {
            userSolvedMap[String(quiz.id)] = userSolved.some(us => us.problemId === quiz.id);
        }

        res.status(200).json(userSolvedMap);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quizzes." });
    }
};


export const getQuizById:RequestHandler = async (req, res) => {
    try {
        const { id, lang} = req.params;
        const quizzes = await prisma.quizProblems.findMany({
            where: {
            id: id,
            ...(lang ? { language: lang } : {}),
            },
        });

        if (!quizzes || quizzes.length === 0) {
            res.status(404).json({ error: "Quiz not found." });
            return;
        }

        const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quiz." });
    }
};


export const toggleUserSolvedQuiz: RequestHandler = async (req, res) => {
    try {
        const { userId, quizId } = req.params;

        if (!userId || !quizId) {
            res.status(400).json({ error: "userId and quizId are required." });
            return;
        }

        const userExists = await prisma.user.findUnique({ where: { id: userId } });
        const quizExists = await prisma.quizProblems.findUnique({ where: { id: quizId } });

        if (!userExists || !quizExists) {
            res.status(404).json({ error: "User or Quiz not found." });
            return;
        }


        const existing = await prisma.userSolved.findFirst({
            where: { userId, problemId: quizId },
        });

        if (!existing) {
            await prisma.userSolved.create({
                data: { userId, problemId: quizId, solved: true },
            });
        }

        res.json({ solved: true });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to toggle solved state." });
    }
};

export const checkQuizAnswer: RequestHandler = async (req, res) => {
    try {
        const { quizId, userId } = req.params;
        const { answer } = req.body;

        if (!quizId || typeof answer !== "string") {
            res.status(400).json({ error: "quizId and answer are required." });
            return;
        }

        const quiz = await prisma.quizProblems.findUnique({
            where: { id: quizId },
        });

        if (!quiz) {
            res.status(404).json({ error: "Quiz not found." });
            return;
        }

        if (quiz.answer.toLowerCase() === answer.toLowerCase()) {
            await prisma.userSolved.create({
                data: {
                    user: {
                        connect: { id: userId }
                    },
                    problem: {
                        connect: { id: quizId }
                    },
                    solved: true
                }
            })
            res.status(200).json("correct");
        } else {
            res.status(200).json("incorrect");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to check quiz answer." });
    }
};

export const getQuizList: RequestHandler = async (req, res) => {
    try {
        const { userId, language, difficulty } = req.params;
        
        console.log(userId, language, difficulty);

        const quizzes = await prisma.quizProblems.findMany({
            where: {
                language: String(language),
                difficulty: String(difficulty),  
            },
        });
        console.log(quizzes)
        let solvedMap: Record<string, boolean> = {};
        if (userId) {
            const solved = await prisma.userSolved.findMany({
                where: { userId: String(userId) },
                select: { problemId: true },
            });
            solvedMap = solved.reduce((acc, curr) => {
            acc[String(curr.problemId)] = true;
            return acc;
            }, {} as Record<string, boolean>);
        }

        // Attach solved status to each quiz
        const quizzesWithSolved = quizzes.map(q => ({
            ...q,
            solved: solvedMap[String(q.id)] || false,
        }));

        const result = quizzesWithSolved;

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quiz list." });
    }
}

// 

export const getTestQuestion: RequestHandler = async (req, res) => {
    try {
        const { language, difficulty } = req.params;

        if (!language || !difficulty) {
            res.status(400).json({ error: "language and difficulty are required." });
            return;
        }

        const question = await prisma.testQuestion.findMany({
            where: {
                language: String(language),
                difficulty: String(difficulty),
            },
            select: {
                id: true,
                question: true,
                language: true,
                difficulty: true,
                choices: true,
                // omit answer field
            },
        });

        const questionsWithStatus = question.map(q => ({
            ...q,
            status: false,
        }));

        if (!question) {
            res.status(404).json({ error: "No question found." });
            return;
        }

        res.status(200).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch test question." });
    }
};

export const checkTestQuestionAnswer: RequestHandler = async (req, res) => {
    try {
        const { answers } = req.body;
        if (!Array.isArray(answers) || answers.length === 0) {
            res.status(400).json({ error: "answers array is required." });
            return;
        }

        const questionIds = answers.map(a => a.questionId);

        const questions = await prisma.testQuestion.findMany({
            where: { id: { in: questionIds } },
            select: { id: true, answer: true }
        });

        const answerMap: Record<string, string> = {};
        questions.forEach(q => {
            answerMap[String(q.id)] = q.answer;
        });

        const results = answers.map(a => ({
            questionId: a.questionId,
            correct: answerMap[a.questionId]?.toLowerCase() === a.answer.toLowerCase()
        }));

        const correctCount = results.filter(r => r.correct).length;
        const score = Math.round((correctCount / results.length) * 100);

        let rating: string;
        if (score >= 90) rating = "A";
        else if (score >= 85) rating = "A-";
        else if (score >= 80) rating = "B+";
        else if (score >= 75) rating = "B";
        else if (score >= 70) rating = "B-";
        else if (score >= 65) rating = "C+";
        else if (score >= 60) rating = "C";
        else if (score >= 55) rating = "C-";
        else if (score >= 50) rating = "D";
        else rating = "E";

        res.status(200).json({ score, rating, results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to check question answers." });
    }
};


