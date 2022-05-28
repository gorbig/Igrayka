const jwt = require('jsonwebtoken')
const  {secret} = require("./config")
const Console = require("console");
module.exports = function (req, res , next){
    if(req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        Console.log(token)
        if(!token){
            return res.status(403).json({message:"Пользователь не авторизованq"})
        }
        const decodedData = jwt.verify(token ,secret )
        req.user = decodedData
        next()
    }
    catch (e){
        console.log(e)
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
};