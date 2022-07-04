const express = require('express');
const AdAccountController = require('../controllers/adaccount.controller');
const AdsController = require('../controllers/ads.controller');

//MIDDLEWARES

const ValidatorMiddleware = require('../middlewares/validator.middleware')



const AdAccountRouter = express.Router();

//Sub Routes ['/Ads]

AdAccountRouter.get('/',  ValidatorMiddleware.validateBusiness, AdAccountController.allAdAccounts)
AdAccountRouter.get('/:adAccountID',ValidatorMiddleware.validateBusiness, AdAccountController.getAdAccount)
AdAccountRouter.post('/new-account',ValidatorMiddleware.validateBusiness, AdAccountController.createAdAccount)



//Exports
module.exports = AdAccountRouter;