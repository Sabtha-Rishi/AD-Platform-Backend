const express = require('express');
const PostsController = require('../controllers/posts.controller');


const PostsRouter = express.Router();

//Sub Routes ['/accounts]

PostsRouter.get('/',PostsController.allPosts)
PostsRouter.post('/create',PostsController.createPost)





//Exports
module.exports = PostsRouter;