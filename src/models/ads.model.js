// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const AdsSchema = new mongoose.Schema({

    adAccountID : {
        type : String,
        required : true
    },

    is_active:{
        type: Boolean,
        required:true,
        default:false
    },
    created_at : {
        type : Date,
        required : true,
        default : Date.now()
    },
    name: {
        type: String,
        required:true
    },
    is_paused : {
        type: Boolean,
        required:true,
        default:false
    },
    CTA : {
        type:String,
        required:true
    },
    daily_budget : {
        type:Number,
        required:true
    },
    isVerified:{
        type: Boolean,
        required:true,
        default:false
    },       
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

AdsSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Ads = module.exports = mongoose.model('Ads', AdsSchema);