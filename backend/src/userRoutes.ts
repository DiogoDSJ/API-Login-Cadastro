import express from 'express';
import { createUser } from '../src/userController';
import { loginUser } from './authController';

const router = express.Router();

// Rota de cadastro
router.post('/createUser', createUser);

// Rota de login
router.post('/login', async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Erro login' });
    }
});

export default router;