const express = require ('express')
const router = express.Router()
const db = require('../util/db')
const permissions = require('../midware/authenticateToken')

router.post('/sendMessage' , permissions , async (req , res)=>{
    console.log('Received sendMessage request:', req.body);
    const { sender_id , receiver_id , content} = req.body;
    try{
   
        const [results] = await db.pool.query(db.sendMessage , [sender_id , receiver_id , content])
        res.status(201).json({ message: '发送成功' });
        console.log(results)
    }
    catch(err){
        console.error('Error:', err);
    }
})

module.exports = router