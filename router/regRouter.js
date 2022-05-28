const Router = require('express')
const router = new Router()
const controller = require('./regController')
const {check} = require("express-validator")
const regMiddleware = require("./regMiddleware")

// router.get('/mgaz',controller.mgaz)
router.post('/registration',[
    check('username',"Name can't be empty").notEmpty(),
    check('password',"The password must be > 4 and < 10 symbols").isLength({min:4, max:10})
], controller.registration)
router.post('/login',controller.login)
router.get('/users',regMiddleware,controller.getUsers)


module.exports = router
