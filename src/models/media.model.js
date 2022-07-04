// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const MediaSchema = new mongoose.Schema({

    businessID : {
        type : String,
        required : true
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
    img :{
        data:Buffer,
        contentType:String,
        
    }
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

MediaSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Media = module.exports = mongoose.model('Media', MediaSchema);