const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const cookie = require('cookie-parser');

const registerRouter = require(path.resolve(__dirname, './api/register'));
const loginRouter = require(path.resolve(__dirname , './api/login'))
const sendMessageRouter = require(path.resolve(__dirname , './api/sendMessage'));

app.use(express.json())
app.use(cookie())
app.use('/api' , registerRouter)
app.use('/api' , loginRouter)
app.use('/api' , sendMessageRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 