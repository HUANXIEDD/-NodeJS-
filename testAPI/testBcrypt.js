const bcrypt = require('bcrypt');

const p1 = "123"
const p2 = "234"
for (let i = 0 ; i < 10 ; i++){
    console.log(bcrypt.hashSync(p1,10))
}

for (let i = 0 ; i < 10 ; i++){
    console.log(bcrypt.hashSync(p2,10))
}

// 模拟注册时加密密码
const password = "123456";
const hashedPassword = bcrypt.hashSync(password, 10);

console.log("哈希结果：", hashedPassword);

// 模拟登录时验证密码
const inputPassword = "123456";
const isMatch = bcrypt.compareSync(inputPassword, hashedPassword);

console.log("密码是否匹配：", isMatch);  // true
