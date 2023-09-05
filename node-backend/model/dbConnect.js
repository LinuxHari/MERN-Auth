const Mongoose = require('mongoose')

const connect = () => Mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log("connected"))
    .catch(() => console.log("failed to connect"))

module.exports = {connect}