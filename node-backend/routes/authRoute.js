const express = require('express')
const {signUp,login,authenticate} = require('../controller/authController')

const router = express.Router()

router.post('/signup',signUp)
router.post('/login',login)
router.post('/authenticate',authenticate)

module.exports = router