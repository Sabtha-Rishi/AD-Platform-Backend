// IMPORTS
multer = require('multer')
const fs = require("fs");
const path = require('path');
const jwt = require('jsonwebtoken')

// MODELs
AdAccountModel = require('../models/adaccount.model')
AccountsModel = require('../models/accounts.model')
AdsModel = require('../models/ads.model')




const createAd= (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AdAccountModel.findOne({_id:req.body.adAccountID}, (err, adAccount)=>{
        if (!adAccount){
            return res.send('AD Account Not Found')
        }

        if (adAccount.businessID != businessID){
            return res.send('Unauthorized for this business')
        }


        if ( !adAccount.is_verified || !adAccount.is_active || adAccount.is_disabled){
            return res.send('AD Account is not verified/active or AD account disabled')
        }



        newAD = AdsModel(req.body);

        newAD.save((err, ad)=>{
            if (err){
                return res.send(err.message)
            }

            return res.send(ad)
        })

    })
    
}

const allads = (req, res)=>{

    AdsModel.find({adAccountID:req.body.adAccountID}, function(err, ads){

        if (err){
            return res.send (err.message)
        }
        return res.send(ads)
    })
}




   



module.exports = {
    createAd,
    allads
}

