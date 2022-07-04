// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const AdAccountSchema = new mongoose.Schema({

    businessID : {
        type : String,
        required : true
    },
    is_active:{
        type: Boolean,
        required:true,
        default:true
    },
    created_at : {
        type : Date,
        required : true,
        default : Date.now()
    },
    is_verified:{
        type: Boolean,
        required:true,
        default:false
    },
    is_disabled:{
        type: Boolean,
        required:true,
        default:false
    },         
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

AdAccountSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const AdAccount = module.exports = mongoose.model('AdAccount', AdAccountSchema);