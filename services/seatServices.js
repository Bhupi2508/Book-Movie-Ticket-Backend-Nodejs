/******************************************************************************
 *  Execution       : default node          : cmd> nodemon seatServices.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    : define a business logics and provide to main function
 *                    for chat services and check the conditions
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
var seatModel = require('../app/models/seatModels')

/*
send message or add message by sender
*/
/*
for signup 
*/
exports.seats = (req, callback) => {
    console.log('In seats services', req)
    /*
    send data to model and callback from there and here both
    */
    seatModel.seatBooked(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for get Trailers details from the database
*/
exports.getSeats = (req, callback) => {
    /*
   send data to model and callback from there and here both
   */
  seatModel.getSeats(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

