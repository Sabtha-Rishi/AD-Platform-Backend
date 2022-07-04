const express = require('express');
const PagesController = require('../controllers/pages.controller');


const PagesRouter = express.Router();

//Sub Routes ['/accounts]

PagesRouter.get('/',PagesController.allPages)
PagesRouter.post('/create',PagesController.createPage)





//Exports
module.exports = PagesRouter;