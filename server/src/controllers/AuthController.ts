import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const login: RequestHandler = async (req, res, next) => {
    try{
        const { name, password } = req.body;

        const userFound = await prisma.user.findFirst({ where: { name } });
        if (!userFound) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }



        const token = jwt.sign(
            { id: userFound.id, name: userFound.name },
            process.env.JWT_SECRET as string,
            { expiresIn: "6h" }
        );

        res.status(200).json({message:"success", token });
    }catch(e){
        next(e);
    }
};

export const register: RequestHandler = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: { 
                email, 
                name, 
                password: hashedPassword, 
            }
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (e) {
        next(e);
    }
};