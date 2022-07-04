//BUILT IN IMPORTS
const express = require('express');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const bodyParser = require('body-parser')

dotenv.config();


// ROUTER IMPORTS
const Router = require('./routers/home.router')
const AccountsRouter = require('./routers/accounts.router');
const MediaRouter = require('./routers/media.router');
const AdAccountRouter = require('./routers/adaccount.router');
const AdsRouter = require('./routers/ads.router');
const PagesRouter = require('./routers/pages.router');
const PostsRouter = require('./routers/posts.router');
const TeamsRouter = require('./routers/teams.router');






//MIDDLEWARE IMPORTS
const ValidatorMiddleware = require('./middlewares/validator.middleware')



// EXPRES APP
const app = express();


// MIDDLEWARES 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded(
    { extended:true }
));



app.set("view engine","ejs");

//  Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => console.log('Connected to DB'))
    .catch((err) => console.log(err));
    


// ROUTES
app.use('/', Router);
app.use('/accounts', AccountsRouter);
app.use('/media', ValidatorMiddleware.isLoggedin, ValidatorMiddleware.validateBusiness,  MediaRouter);
app.use('/pages', ValidatorMiddleware.isLoggedin, ValidatorMiddleware.validateBusiness,  PagesRouter);
app.use('/posts', ValidatorMiddleware.isLoggedin, ValidatorMiddleware.validateBusiness,  PostsRouter);
app.use('/teams', ValidatorMiddleware.isLoggedin, ValidatorMiddleware.validateBusiness,  PostsRouter);
app.use('/adaccount', ValidatorMiddleware.isLoggedin, AdAccountRouter);
app.use('/adaccount/ads', ValidatorMiddleware.isLoggedin, AdsRouter);





// EXPORTS
module.exports = app;