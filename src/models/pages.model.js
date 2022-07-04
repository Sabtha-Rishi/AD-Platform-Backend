// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const PagesSchema = new mongoose.Schema({

    businessID : {
        type : String,
        required : true
    },

    adAccountID : {
        type:String,
        required:false,
    },
    is_active: {
        type:Boolean,
        required: true,
        default:true
    },
    is_disabled: {
        type:Boolean,
        required: true,
        default:false
    },  
    name : {
        type:String,
        required:true
    },
    created_at : {
        type : Date,
        required : true,
        default : Date.now()
    },
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

PagesSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Pages = module.exports = mongoose.model('Pages', PagesSchema);