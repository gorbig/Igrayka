const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  {validationResult} = require('express-validator')
const  {secret} = require("./config")
const {sign} = require("jsonwebtoken")


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload,
        secret,
        {expiresIn: "24h"})
}

class regController{
    async registration(req,res)
    {
      try{
          const errors = validationResult(req)
          if(!errors.isEmpty()){
              return res.status(400).json({message:"Ошибка при регистрации", errors})
          }
          const {username,password} = req.body
          const candidate = await User.findOne({username})
          if(candidate){
              return res.status(400).json({message:"a user with the same name already exists"})
          }
          const hashPassword = bcrypt.hashSync(password, 7);
          const userRole = await Role.findOne({value: "USER"})
          const user = new User({username, password: hashPassword, roles: ["USER"]})
          await user.save()
          return res.json({message:"Пользователь успешно зарегистрировался"})
      }
      catch (e){
        console.log(e)
          res.status(400).json({message:'Registration error'})
      }
    }

    async login(req,res){
      try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user)
        {
            return res.status(400).json({message:"Пользователь "  + username + " не найден"})

        }
        const validPassword = bcrypt.compareSync(password, user.p)

        if(!validPassword)
        {
           return res.status(400).json({message:'Ввведен не верный пароль  '})
        }
        const token = generateAccessToken(username._id, username.roles)
         return res.json({token})}

      catch (e){
          console.log(e)
          res.status(400).json({message:'Login error'})
      }
    }

    async getUsers(req,res){
      try{
          // const users = await User.find()
          // res.json(users)
      }
      catch (e){
        console.log(e)
      }
    }
}

module.exports = new regController()