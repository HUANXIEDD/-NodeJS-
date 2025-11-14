const express = require('express');
const router = express.Router();
const db = require('../util/db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);

    const { username, password } = req.body;

    try {
        const [results] = await db.pool.query(db.sqlCheckFromUserlogin, [username]);
        console.log('Database query results:', results);
        if (results.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await db.pool.query(db.sqlInsertFromUserlogin, [username, hashedPassword]);

        res.status(201).json({ message: '注册成功' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: '服务器错误' });
    }
});

module.exports = router;
