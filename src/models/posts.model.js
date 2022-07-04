// ______________________________________ IMPORTS START ________________________

const mongoose = require('mongoose');


// ______________________________________ IMPORTS END  ________________________
// ______________________________________ SCHEMA START  _______________________

const PostsSchema = new mongoose.Schema({

    businessID : {
        type : String,
        required : true
    },

    pageID : {
        type:String,
        required:true,
    },
    is_active: {
        type:Boolean,
        required: true,
        default:true
    },
    is_archieved: {
        type:Boolean,
        required: true,
        default:false
    }, 
    is_blocked: {
        type:Boolean,
        required: true,
        default:false
    }, 
    title : {
        type:String,
        required:true
    },
    caption : {
        type:String,
        required:true,
        default:''
    },
    created_at : {
        type : Date,
        required : true,
        default : Date.now()
    },
    mediaID :{
        type:String,
        required:true
    }
});

// ______________________________________ SCHEMA END  ____________________________
//  _____________________________________ MODEL METHODS START _____________________

PostsSchema.methods = {

};

//  _____________________________________ MODEL METHODS END ______________________
//  _________________________________________ EXPORTS _____________________________

const Posts = module.exports = mongoose.model('Posts', PostsSchema);