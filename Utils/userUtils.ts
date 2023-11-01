const jwt = require('jsonwebtoken');

const secretKey = 'ben103';

const getUserId = (req: Request, res: any) => {
    const headerAuth = req.headers["authorization"];
    const token  = headerAuth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId:Number = decoded.userId;
        res.userId= userId;
        console.log(decoded, 'decoded');
        return res;
    } catch (error) {
        console.error('Token verification error:', error);
    }
}


module.exports = { getUserId };
