// IMPORTS
multer = require('multer')
const fs = require("fs");
const path = require('path');
const jwt = require('jsonwebtoken')

// MODELS
AdAccountModel = require('../models/adaccount.model')
AccountsModel = require('../models/accounts.model')



const createAdAccount = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;


    let newAdAccount = new AdAccountModel(req.body);
    newAdAccount.businessID = businessID;
        
        
    newAdAccount.save((err, adAccount)=>{
        if (err) { 
            return res.status(400).send({
                "error" : err.message
            });
        } 
        else { 
            return res.send(adAccount); 
        } 
            })

        }
   

const allAdAccounts = (req, res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AdAccountModel.find({businessID:businessID}, (err, adAccounts)=>{
        if(err){
            return res.send(err.message)
        }

        if (adAccounts.length ===0){
            return res.send("No AD accounts found")
        }

        return res.send(adAccounts)
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
    allAdAccounts,
    createAdAccount,
    getAdAccount,
}

