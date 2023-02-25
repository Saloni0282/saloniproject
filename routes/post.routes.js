const express = require('express');

const { PostModel } = require("../model/post.model")
require("dotenv").config();

const postRouter = express.Router();

postRouter.get('/', async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    const posts = await PostModel.find({userId});
    res.send(posts);
});


postRouter.post('/top', async (req, res) => {
    const payload = req.body;
    const post = new PostModel(payload);
    await post.save();
    res.send({ status: 'Post created successfully' });
    
})

postRouter.patch("/update/:id", async (req, res) => {
    let id = req.params.id;
    const payload = req.body;
    try {
        await PostModel.findByIdAndUpdate({ _id: id }, payload);
        res.send({ status: 'Post updated successfully' });
    } catch (err) {
        res.send({ status: err.message });
    }
})


postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await PostModel.findByIdAndDelete(id);
        res.send({ status: `POST with id: ${id} has been deleted` });
    } catch (err) {
        res.send({ status: err.message });
    }
    
})

module.exports = {
    postRouter
}
