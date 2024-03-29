/******************************************************************************
 *  Execution       : default node          : cmd> nodemon route.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Connect all the path and do routing
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 21-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
var verify = require('../authantication/index');
const user = require('../controller/controller')
const movie = require('../controller/movieController')
const chatUser = require('../controller/chatController')
const seat = require('../controller/seatController')
const express = require('express');
const router = express.Router();
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/forgotPassword', user.forgotPassword);
router.post('/resetPassword', verify.auth, user.resetPassword);
router.post('/movieDetail', movie.movie)
router.get('/getMovieDetail', movie.getAllMovieDetail)
router.post('/getMovie', movie.getMovieDetail)
router.post('/getTrailer', movie.getTrailer)
router.post('/seats',seat.seats)
router.post('/addMessage', chatUser.addMessage)
router.get('/getAllUser', verify.auth, user.getAllUser);
router.get('/userMsg', chatUser.userMsg);
router.get('/getSeatBooked', seat.getSeats)


module.exports = router;