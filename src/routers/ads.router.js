const express = require('express');
const AdsController = require('../controllers/ads.controller');

//MIDDLEWARES

const ValidatorMiddleware = require('../middlewares/validator.middleware')



const AdsRouter = express.Router();

//Sub Routes ['/Ads]

AdsRouter.get('/', ValidatorMiddleware.validateBusiness, ValidatorMiddleware.validateAds, AdsController.allads)
AdsRouter.post('/newad',ValidatorMiddleware.validateBusiness, ValidatorMiddleware.validateAds,   AdsController.createAd)



//Exports
module.exports = AdsRouter;