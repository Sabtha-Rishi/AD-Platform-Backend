// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const TeamsSchema = new mongoose.Schema({

    businessID : {
        type : String,
        required : true
    },

    adAccountIDs : {
        type:[String],
        required:false,
    },
    pageIDs : {
        type:[String],
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
    member_name : {
        type:String,
        required:true
    },
    joined_at : {
        type : Date,
        required : true,
        default : Date.now()
    },
    editingAccess : {
        type:Boolean,
        required: true,
        default:false
    },
    creationAccess : {
        type:Boolean,
        required: true,
        default:false
    },
    deletionAccess : {
        type:Boolean,
        required: true,
        default:false
    },
    role : {
        type:String,
        default:"member",
        required:true
    },
    email : {
        type:String,
        required:true
    },




    
    hash:String,
    salt:String

});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

TeamsSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Teams = module.exports = mongoose.model('Teams', TeamsSchema);