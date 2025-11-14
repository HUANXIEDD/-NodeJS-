    const express = require('express');
    const router = express.Router();
    const db = require('../util/db');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const dotenv = require('dotenv');
    const path = require('path');
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
    const jwtSecret = process.env.JWTSecret;

    router.post('/login' , async (req , res)=>{
        console.log("Received login request:", req.body)
        const {username , password} = req.body;
        try{
            const [results] = await db.pool.query(db.sqlCheckFromUserlogin , [username])
            console.log('Database query results:', results);
            if (results.length == 0 ){
                console.log("user had worng username")
                return res.status(401).json({ message: '用户名错误' });
            }
            if (!bcrypt.compareSync(password,results[0].password)) {
                console.log("user had wrongs password")
                return res.status(401).json({ message: '密码错误' });
            }
            const token = jwt.sign(
                {
                    id : results[0].id ,
                    username : results[0].username,
                } ,
                jwtSecret ,
                {expiresIn : '1h'});
            res.json({message: '登录成功' , token: token });
        }catch(err){
            console.error('Database error:', err);
            res.status(500).json({ message: '服务器错误' });
        }
    })

    module.exports = router;   