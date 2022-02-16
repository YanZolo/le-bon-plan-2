const express = require('express');
const Route = express.Router();
const userController = require('../userController');
const authController = require('../authController');





Route.get('/login', authController.isAuth, (req, res) => {
    res.render('login.ejs')
});

Route.get('/register', authController.isAuth, (req, res) => {
    res.render('register.ejs')
});

Route.post('/login',
    authController.isAuth,
    userController.getUser,
    authController.comparePassword,
    authController.generateTokens,
);

Route.post('/register',
    authController.isAuth,
    authController.hashPassword,
    userController.registerUser);

Route.get('/admin', authController.authenticateToken, userController.getAllUsers,(req, res) => {
    console.log('req.user route admin  :>> ', req.user);
    res.render('profil.ejs', { name: req.user.username, users: req.users })
});


Route.post('/token',
    authController.refreshToken,
    authController.generateTokens)

Route.get('/logout', userController.getLogout)

module.exports = Route;