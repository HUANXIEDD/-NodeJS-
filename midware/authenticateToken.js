const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const jwtSecret = process.env.JWTSecret;
function authenticateToken(req, res, next) {
    const headers = req.headers
    const token  = headers['authorization'].split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: '未提供Token，请先登录' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err){
            return res.status(401).json({ message: 'Token无效或已过期，请重新登录' });
        }
        req.body.user = user ; 
        next();
    })
}

module.exports = authenticateToken;
