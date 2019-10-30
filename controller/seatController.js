/******************************************************************************
 *  Execution       : default node          : cmd> nodemon seatController.js
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
 *  @since          : 30-oct-2019
 *
 ******************************************************************************/
/*
required files
*/
var seatService = require('../services/seatServices');
var jwt = require('jsonwebtoken');
var sendmail = require('../middleware/sendMail');
/*
signup function and provide some validations
*/
module.exports.seats = (req, res) => {
    req.checkBody('movieName', 'Movie Name is not valid').isLength({ min: 1 });
    req.checkBody('bookedSeat', 'booked Seat is not valid').isLength({ min: 1 });
    req.checkBody('time', 'time is not valid').isLength({ min: 1 })
    req.checkBody('date', 'date should be valid').isLength({ min: 1 })
    req.checkBody('place', 'place is not valid').isLength({ min: 1 })

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
        seatService.seats(req.body, (err, data) => {
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