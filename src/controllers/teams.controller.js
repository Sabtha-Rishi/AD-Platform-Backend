// IMPORTS
const jwt = require('jsonwebtoken')

// MODELS
TeamsModel = require('../models/teams.model')
AccountsModel = require('../models/accounts.model')



const newMember = (req, res)=>{

    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;


    let memberObject = new TeamsModel(req.body);
    memberObject.businessID = businessID;
        
        
    memberObject.save((err, member)=>{
        if (err) { 
            return res.status(400).send({
                "error" : err.message
            });
        } 
        else { 
            return res.send(member); 
        } 
            })

        }
   

const allMembers = (req, res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    TeamsModel.find({businessID:businessID}, (err, members)=>{
        if(err){
            return res.send(err.message)
        }

        if (pages.length ===0){
            return res.send("No AD accounts found")
        }

        return res.send(members)
    })

}

const getAdAccount = (req, res)=>{
    const businessID = (jwt.verify(req.cookies.token, process.env.JWT_SECRET)).id;

    AdAccountModel.find({_id:req.body.adAccountID}, (err, adAccount)=>{
        if(err){
            return res.send(err.message)
        }

        if (!adAccount){
            return res.send("No AD accounts found")
        }

        return res.send(adAccount)
    })

}


module.exports = {
    allMembers,
    newMember,
    getAdAccount,
}

