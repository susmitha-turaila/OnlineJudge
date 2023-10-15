const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
const UserModel = require('./models/User')
const app = express()
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(express.json());

// router added here
app.use('/', require('./routes/index'));

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

const verifyUserForDashboard = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is not available")
    }
    else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err){
                return res.json("Token is wrong")
            }else{
                if(decoded.role === "admin"){
                    next();
                }
                else{
                    return res.json("not admin")
                }
            }
            next();
        })
    }
}

// get/post API code is moved to router -> controller

//DB code moved to config 

app.listen(3000, (err)=>{
	if(err){console.log(`error in running in 3000`)}
	console.log(`app running on port 3000`);
})