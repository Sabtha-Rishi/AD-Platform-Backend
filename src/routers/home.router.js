// Built in Imports
const express = require('express');
const Router = express.Router()

// Controllers
const Controller = require('../controllers/home.controller')


//Routes
Router.get('/', Controller);



module.exports = Router;