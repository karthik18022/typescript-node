import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req:any , res:any, next:any): any {
    console.log('enterpoint', req);
    
    const token = req.header('authorization');
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }
    const finalToken = token.split(' ')[1];

    try {
        const decoded = jwt.verify(finalToken, 'ben103') ;
        req.user = decoded;
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
    next();

}

// export { authenticateToken };
module.exports={authenticateToken}
