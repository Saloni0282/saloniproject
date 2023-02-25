const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) { 
        jwt.verify(token, process.env.secretKey, (err, decoded) => {
            if (decoded) { 
                console.log(decoded);
                req.body.user = decoded.userId;
                next();
                
            } else {
                res.send({msg:"Please Login"})
            }
        })
    } else {
        res.send({ msg: "User already exist, please login" });
    }
}


module.exports = {
    authentication
}