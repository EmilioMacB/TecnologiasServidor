import { Request, Response } from 'express';

export function getUsers(req: Request, res: Response) {
    console.log('User:', req.user);
    res.send([]);
}

export function uploadPic(req: Request, res: Response) {
    res.send('ok');

    
}

export function showUploadForm(req: Request, res: Response) {
    res.render('upload');
}