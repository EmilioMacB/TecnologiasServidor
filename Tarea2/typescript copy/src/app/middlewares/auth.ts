import { IUser } from 'app/interfaces/user';
import { Request, Response, NextFunction } from 'express';


declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
    
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // body, query, ruta
    const token = req.query.token;
    if ( token === '12345' ) {
        req.user = {
            id: 123,
            name: 'Juan',
            email: 'juan@iteso.mx'
        }
        next();
    } else {
        // res.status(401).send({ mensaje: "no estas logueado"});
        // res.statuts(401).send();
        res.sendStatus(401);
    }


}