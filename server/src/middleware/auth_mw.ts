import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token: string | undefined = Array.isArray(req.headers["token"]) ? req.headers["token"][0] : req.headers["token"];

        if (!token) {
            res.status(401).send('No Token, Authorization Denied');
            return;
        }

        const decode = jwt.verify(token, 'jwtSecret') as jwt.JwtPayload;
        console.log("middleware" , decode);
  
        // เมื่อเสร็จสิ้น 
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send('Token Invalid');
        return;
    }
};
