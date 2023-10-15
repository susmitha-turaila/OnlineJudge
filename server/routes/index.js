const express = require('express');
const homeController = require('../controllers/homeController') // go to controller
const routes = express.Router();

app.get('/home', verifyUser, homeController.verifyUser)

app.get('/dashboard', verifyUserForDashboard, homeController.verifyDashboard)

app.post('/login',homeController.login)

app.post('/register',homeController.register)

module.exports = routes;