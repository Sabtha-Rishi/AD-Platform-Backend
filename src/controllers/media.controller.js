// IMPORTS
multer = require('multer')
const fs = require("fs");
const path = require('path');
const jwt = require('jsonwebtoken')

// MODEL
MediaModel = require('../models/media.model')


// STORAGE
var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./Media/',(err)=>{
            cb(null, './Media/');
         })
        },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

var upload = multer({ storage: Storage })


const uploadFile = (req,res)=>{

    //Image Buffer
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');

    //BusinessID
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET))

    var mediaObject = {
        img: {
            data:new Buffer.from(encode_img,'base64'),
            contentType:req.file.mimetype
        },
        businessID : businessID.id,
        name:req.body.name
    };

    

    MediaModel.create(mediaObject,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log("Saved To database");
            res.contentType(mediaObject.img.contentType);
            res.send(mediaObject.img.data);
        }
    })
}


// ENDPOINT for all images of the business
const allImages = (req,res) => {
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id

    const images = MediaModel.find({businessID:businessID}, function(err, images){
        return res.send(images)
    })

}

const getImage = (req,res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id
    const image = MediaModel.findOne({businessID:businessID, _id:req.params.mediaID}, function(err, image){
        if(err){
            return res.send(err.message)
        }
        if (!image){
            return res.send("Media do not exist or business do not have access to the media")
        }
        return res.contentType(image.img.contentType).send(image.img.data)
        // return res.send(image.image)
    })
}



module.exports = {
    upload,
    uploadFile,
    allImages,
    getImage
}

