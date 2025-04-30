import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';


const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.post('/users', async (req: Request, res: Response) => {
    console.log(req.body)
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            password: req.body.password
        }
    })
    res.status(201).json(req.body)
})

app.get('/users', async (req: Request, res: Response) => {

    let usuarios = []
    
    if (req.query.name)
    {
        usuarios = await prisma.user.findMany({
            where: {
                name : String(req.query.name)
            }
        })
    }
    else
    {
        usuarios = await prisma.user.findMany()
    }
    res.status(200).json(usuarios)
})

app.put('/users/:id', async (req: Request, res: Response) => {

    console.log(req.body)
    await prisma.user.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            password: req.body.password
        }
    })
    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req: Request, res: Response) => {

    await prisma.user.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    res.status(200).json({ message: "Usuario deletado." })
})

app.listen(3000)
