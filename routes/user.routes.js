const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => { 
    const{name,email,password} = req.body;
    try {
        bcrypt.hash(password, 5, async(err, hash)=>{
    if(err){
        res.send({ status: "Something is wrong","err":err.message });
    } else {
        const user= new UserModel({name, email,password:hash})
        await user.save();
        res.send({status: 'New user has been registered'});
    }
});
        
}
    catch(err){
        res.send({ status: "Something is wrong","err":err.message });
    }
    
})


userRouter.post("/login", async (req, res) => { 
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result)=>{
                if (result) {
                    let token = jwt.sign({ userId: user[0].id }, process.env.secretKey);
                    res.send({msg:"Logged in",token:token});
                } else {
                    res.send({msg:"Wrong Credentials"});
              }
            }); 
        } else {
            res.send({ msg: "Wrong Credentials" });
        }
    } catch (err) {
        res.send({ msg: "Something went wrong" });
    }
})

module.exports = {
    userRouter
}
