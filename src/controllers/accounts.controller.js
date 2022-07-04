const User = require('../models/accounts.model'); 
const jwt = require('jsonwebtoken');
const AccountsModel = require('../models/accounts.model');

//  Creating new user
const createUser = async (req, res) => { 

        let newUser = new User(req.body); 
    
        newUser.setPassword(req.body.password); 
        
        newUser.save((err, User) => { 
            if (err) { 
                return res.status(400).send({
                    "error" : err.message
                });
            } 
            else { 
                User.save(newUser);
                return res.send("Registration Successful"); 
            } 
        }); 
        
    }; 



// User Login and Token Generator
const loginUser =  (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                error : "User not found."
            }); 
        } 
        else { 
            if (user.validPassword(req.body.password)) { 

                const token = jwt.sign({
                    id : user._id,
                }, process.env.JWT_SECRET);

                res.cookie("token", token, { expire: new Date() + 9999 });
                return res.status(201).send({ 
                    token : token
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}

// User Logout
const logoutUser = (req, res) => {
    res.clearCookie("token")
    res.send("Logged out")
}


//getUser
const getUser = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AccountsModel.findOne({_id:businessID}, (err, business)=>{
        if(err){
            return res.send(err.message)
        }

        if (!business){
            return res.send("No business found")
        }

        return res.send(business);
    })
}

//Change Password
const changePassword = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AccountsModel.findOne({_id:businessID}, (err, business)=>{
        if(err){
            return res.send(err.message)
        }
    
        if (!business){
            return res.send("No business found")
        }

        if(req.body.oldPassword===req.body.newPassword){
            return res.send('Old and new password are same')
        }
    
        if(req.body.newPassword!==req.body.confirmPassword){
            return res.send('Passwords do not match')
        }
        if (!business.validPassword(req.body.oldPassword)){
            return res.send('OLD password is wrong')
        }

        business.setPassword(req.body.newPassword);
        business.save((err,result)=>{
            if(err){
                return res.send(err.message)
            }
            return res.send(result)
        })
    })
}


//Reset Password
const resetPassword = (req, res)=>{

}


const AccountsController = {
    createUser,
    loginUser,
    logoutUser,
    getUser,
    changePassword
}

module.exports = AccountsController;