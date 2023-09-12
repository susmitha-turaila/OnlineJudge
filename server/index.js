const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const UserModel = require('./models/User')
const app = express()

app.use(express.json());
app.use(cors())
 

app.post('/register',(req,res)=>{
    console.log(req.body)
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


mongoose.set("strictQuery",false)
mongoose.
connect('mongodb+srv://admin:12345@onlinejudge.uowjlcz.mongodb.net/OnlineJudge?retryWrites=true&w=majority')
.then(()=> {
    app.listen(3000, ()=>{
        console.log('server is running')
    })}).catch((error)  => {
    console.log(error)
})