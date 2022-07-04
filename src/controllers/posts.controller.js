// IMPORTS
multer = require('multer')
const jwt = require('jsonwebtoken')

// MODELS
PostsModel = require('../models/posts.model')
AccountsModel = require('../models/accounts.model')



const createPost = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;


    let newPost = new PostsModel(req.body);
    newPost.businessID = businessID;
        
        
    newPost.save((err, post)=>{
        if (err) { 
            return res.status(400).send({
                "error" : err.message
            });
        } 
        else { 
            return res.send(post); 
        } 
            })

        }
   

const allPosts = (req, res)=>{

    PostsModel.find({pageID:req.body.pageID}, (err, posts)=>{
        if(err){
            return res.send(err.message)
        }

        if (posts.length ===0){
            return res.send("No AD accounts found")
        }

        return res.send(posts)
    })

}

const getAdAccount = (req, res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AdAccountModel.find({_id:req.body.adAccountID}, (err, adAccount)=>{
        if(err){
            return res.send(err.message)
        }

        if (!adAccount){
            return res.send("No AD accounts found")
        }

        return res.send(adAccount)
    })

}


module.exports = {
    allPosts,
    createPost,
    getAdAccount,
}

