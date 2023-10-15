const User = require('../models/User');  // user model 
//can import multiple models here 

module.exports.verifyUser = function (req, res){
    return res.json("Success")
}

module.exports.verifyDashboard = function (req, res){
    return res.json("Success")
}

module.exports.login = function (req,res){
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
           if(user){
               bcrypt.compare(password, user.password, (err,response) =>{
               if(response){
                   const token = jwt.sign({email: user.email, userId: user.userId, role: user.role}, "jwt-secret-key", {expiresIn: "1d"})
                   res.cookie("token", token);
                   return res.json({Status: "Success", role: user.role})
               }
               else{
                   res.json("The password is incorrect") 
               }
           })
           
       }  else{
               res.json("No record existed")
       }
   })
}

module.exports.register = function (req,res){
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash =>{
        console.log({name,email,password: hash})
        UserModel.create({name,email,password: hash})
        .then(user => res.json({status: "OK"}))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
}
