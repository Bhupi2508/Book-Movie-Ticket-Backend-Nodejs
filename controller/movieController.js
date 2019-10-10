/******************************************************************************
 *  Execution       : default node          : cmd> nodemon controller.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : Control all the file and provide to services
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
var movieService = require('../services/movieServices');
var jwt = require('jsonwebtoken');
var sendmail = require('../middleware/sendMail');
/*
signup function and provide some validations
*/
module.exports.movie = (req, res) => {
    req.checkBody('movieName', 'MovieName is not valid').isLength({ min: 2 });
    req.checkBody('castName', 'CastName is not valid').isLength({ min: 3 });
    req.checkBody('directorName', 'DirectorName is not valid').isLength({ min: 2 })
    req.checkBody('rating', 'Rating should be valid').isLength({ min: 2 })
    req.checkBody('details', 'Details is not valid').isLength({ min: 15 })
    req.checkBody('releaseDate', 'releaseDate is not valid').isLength({ min: 4 })
    req.checkBody('poster', 'Poster is not valid')
    req.checkBody('trailer','Trailer link is not valid')

    var errors = req.validationErrors();
    var response = {};
    /*
    check validations if error came then send error response
    */
    if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } else {
        /*
         send the req to the services and then callback
        */
        movieService.movies(req.body, (err, data) => {
            if (err) {
                console.log("error in Controller  =====>> ", err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log("Data in Controller  =====>> ", data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
};

/*
getAllUser function check function if no error then provide to services
*/
exports.getAllMovieDetail = (req, res) => {
    /*
    send the req to the services and then callback
    */
    movieService.getAllMovieDetail(req, (err, data) => {
        var response = {};
        if (err) {
            console.log("error");
            return callback(err);
        } else {
            response.success = true;
            response.result = data;
            res.status(200).send(response);
            console.log("ok.....", response);


        }
    })
};

/*
getMovieDetail function check function if no error then provide to services
*/
exports.getMovieDetail = (req, res) => {
    /*
    send the req to the services and then callback
    */
    movieService.getMovieDetail(req, (err, data) => {
        var response = {};
        if (err) {
            console.log("error");
            return callback(err);
        } else {
            response.success = true;
            response.result = data;
            res.status(200).send(response);
           console.log("ok.....", response);
        }
    })
};

/*
getMovieDetail function check function if no error then provide to services
*/
exports.getTrailer = (req, res) => {
    /*
    send the req to the services and then callback
    */
    movieService.gettrailers(req, (err, data) => {
        var response = {};
        if (err) {
            console.log("error");
            return callback(err);
        } else {
            response.success = true;
            response.result = data;
            res.status(200).send(response);
           console.log("ok.....", response);
        }
    })
};
