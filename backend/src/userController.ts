import { PrismaClient } from '../generated/prisma';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
                password: hashedPassword
            }
        })
        res.status(201).json({
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        })
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar usuario" })
    }
}
