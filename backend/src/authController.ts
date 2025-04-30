// authController.ts


import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
    try {

        const email = req.body.email
        const password = req.body.password
        console.log('Email:', req.body.email);
        console.log('Password:', req.body.password);

        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado!" })
        }
        console.log(user)
        const checkPasswordMatch = await bcrypt.compare(password, user.password)

        if (!checkPasswordMatch) {
            return res.status(401).json({ error: "Senha incorreta!" })
        }

        const token = jwt.sign(
            { userId: user.id }, // payload
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }  // expira em 1 hora
        );

        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao fazer login" })
    }
}