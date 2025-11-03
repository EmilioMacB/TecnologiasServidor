
import { Request, Response } from 'express';

export function login(req: Request, res: Response) {
    console.log('Login body: ', req.body);
    res.send({token:'1234asdf'})
}

export function signup(req: Request, res: Response) {
    // crear usuario
    console.log('Signup body: ', req.body);
    res.send();
}