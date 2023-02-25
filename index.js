const express = require('express');
const { connection } = require("./db");
const { userRouter } = require('./routes/user.routes');
const { postRouter } = require("./routes/post.routes");
const { authentication } = require('./middleware/middleware');

require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => { 
    res.send("Welcome On Purple!");
})

app.use("/users", userRouter)
app.use(authentication)
app.use("/posts", postRouter)

app.listen(process.env.port, async (res, req) => {

    try {
        await connection;
        console.log('Connected to server');
        
    } catch (err) {
        console.log(err);
        
    }
    console.log(`Server running on port ${process.env.port}`);
});
