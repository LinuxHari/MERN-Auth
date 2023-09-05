const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY

const createJWT = (data) => {
    const token = jwt.sign(data,secretKey)
    return token
}

const verifyJWT = (data) => {
    const getData = jwt.verify(data,secretKey,{expiresIn: "120s"},(err,userData) => {
        if(userData.email)
            return userData.email
    })
    return getData
}

module.exports = {createJWT, verifyJWT}