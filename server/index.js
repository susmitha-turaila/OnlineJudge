const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const UserModel = require('./models/User')
const app = express()
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is not available")
    }
    else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Token is wrong")
            }
            next();
        })
    }
}

app.get('/home', verifyUser, (req,res) => {
     return res.json("Success")
})
 
app.post('/login', (req,res)=>{
     const {email,password} = req.body;
     UserModel.findOne({email: email})
     .then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err,response) =>{
                if(response){
                    const token = jwt.sign({email: user.email, userId: user.userId}, "jwt-secret-key", {expiresIn: "1d"})
                    res.cookie("token", token);
                    res.json("Success")
                }
                else{
                    res.json("The password is incorrect") 
                }
            })
            
        }  else{
                res.json("No record existed")
        }
    })
})

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash =>{
        console.log({name,email,password: hash})
        UserModel.create({name,email,password: hash})
        .then(user => res.json(user))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
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