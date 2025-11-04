import { Request, Response } from 'express';


export function renderChat(req: Request, res: Response) {
    const rooms = [
        { id: 'general', name: 'General' },
        { id: 'videojuegos', name: 'Videojuegos' },
        { id: 'musica', name: 'Música' },
        { id: 'cine', name: 'Cine' }
      ];
    res.render('chat', { rooms });
}