const jwt = require('jsonwebtoken');
const AccountsModel = require('../models/accounts.model');
const AdAccountsModel = require('../models/adaccount.model');
const AdsModel = require('../models/ads.model');




const isLoggedin = (req, res, next) => {
    try{
        if (!req.cookies.token){
            return res.send('login required');
        }

        const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id
        AccountsModel.findOne({ _id : businessID }, function(err, user) { 
            
            if(err) {
                return res.send(err.message);
            }
            next()
        })
        
    } catch {
        res.status(401).json({
          error: ('Invalid request!')
        });
    }
}


const validateBusiness = (req, res, next)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id
    AccountsModel.findOne({ _id : businessID }, function(err, business) { 
            
        if(err) {
            return res.send(err.message);
        }
        if (!business.is_phone_verified ||  !business.is_email_verified ){
            return res.send('Business Verfication Pending')
        }

        if (business.is_disabled){
            return res.send("Business Disabled")
        }

        next()
    })

}


const validateAds = (req, res, next)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id

    AdsModel.findOne({adAccountID:req.body.adAccountID}, (err, adAccount) =>{
        if (!adAccount){
            return res.send("No Ad account found")
        }

        if (!adAccount.is_verified){
            return res.send("Ad account not verified")
        }

        if (adAccount.is_disabled){
            return res.send("Ad account disabled")
        }

        if (adAccount.businessID != businessID){
            return res.send("AD account do not belong to this business")
        }

        next()

    })

}





const ValidatorMiddleware = {
    isLoggedin,
    validateBusiness,
    validateAds,
}

module.exports = ValidatorMiddleware;
