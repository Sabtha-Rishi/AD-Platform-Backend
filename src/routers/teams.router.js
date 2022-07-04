const express = require('express');
const TeamsController = require('../controllers/teams.controller');


const TeamsRouter = express.Router();

//Sub Routes ['/accounts]

TeamsRouter.get('/',TeamsController.allMembers)
TeamsRouter.post('/newMember',TeamsController.newMember)





//Exports
module.exports = TeamsRouter;