const express = require('express');
const MediaController = require('../controllers/media.controller');


const MediaRouter = express.Router();

//Sub Routes ['/accounts]

MediaRouter.get('/', MediaController.allImages)
MediaRouter.get('/:mediaID', MediaController.getImage)
MediaRouter.post('/upload',MediaController.upload.single('file') ,MediaController.uploadFile)





//Exports
module.exports = MediaRouter;