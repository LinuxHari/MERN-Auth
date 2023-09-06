const express = require('express')

const app = express()

const CORS = require('cors')

require('./model/dbConnect').connect()

const authRoute = require('./routes/authRoute')

app.use(express.json())

app.use(express.urlencoded())

app.use(CORS())

app.use(authRoute)

app.listen(8000,()=>{
    console.log("Server is listening...",8000);
})