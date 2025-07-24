import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createOpenAIRequest } from "../utils/openAI";
import { JsonFormatResponseChat } from "../utils/jsonFormat";

const prisma = new PrismaClient();
export const getUserSolvedQuizzes = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const userSolved = await prisma.userSolved.findMany({
            select: {
                problemId: true
            },where: {
                userId
            }
        });

        console.log(userSolved);

        const AllQuiz = await prisma.quizProblems.findMany({});

        const userSolvedMap = new Map<string, boolean>();
        for (const quiz of AllQuiz) {
            if (userSolved.find(us => us.problemId === quiz.id)) {
                userSolvedMap.set(String(quiz.id), true);
            } else {
                userSolvedMap.set(String(quiz.id), false);
            }
        }


        console.log(userSolvedMap);
        res.status(200).json("hallo")
        // res.status(200).json(userSolvedMap);
        return;

        res.status(200).json("Kontol");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quizzes." });
    }
};


export const getQuizById:RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await prisma.quizProblems.findUnique({
            where: { id: id },
        });

        if (!quiz) {
            res.status(404).json({ error: "Quiz not found." });
            return;
        }

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