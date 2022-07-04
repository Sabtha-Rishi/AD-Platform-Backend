//Imports
const express = require('express');
const AccountsController = require('../controllers/accounts.controller');

const Validator = require('../middlewares/validator.middleware');


const AccountsRouter = express.Router();

//Sub Routes ['/accounts]

AccountsRouter.post('/register', AccountsController.createUser)
AccountsRouter.post('/login', AccountsController.loginUser)
AccountsRouter.post('/logout', AccountsController.logoutUser)
AccountsRouter.get('/user', Validator.isLoggedin, AccountsController.getUser)
AccountsRouter.post('/changepassword', Validator.isLoggedin, AccountsController.changePassword)




//Exports
module.exports = AccountsRouter;