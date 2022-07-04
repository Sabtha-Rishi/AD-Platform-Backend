// IMPORTS
multer = require('multer')
const jwt = require('jsonwebtoken')

// MODELS
PagesModel = require('../models/pages.model')
AccountsModel = require('../models/accounts.model')



const createPage = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;


    let newPage = new PagesModel(req.body);
    newPage.businessID = businessID;
        
        
    newPage.save((err, page)=>{
        if (err) { 
            return res.status(400).send({
                "error" : err.message
            });
        } 
        else { 
            return res.send(page); 
        } 
            })

        }
   

const allPages = (req, res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    PagesModel.find({businessID:businessID}, (err, pages)=>{
        if(err){
            return res.send(err.message)
        }

        if (pages.length ===0){
            return res.send("No AD accounts found")
        }

        return res.send(pages)
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
    allPages,
    createPage,
    getAdAccount,
}

