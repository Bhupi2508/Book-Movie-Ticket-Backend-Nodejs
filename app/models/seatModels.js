/******************************************************************************
 *  Execution       : default node          : cmd> nodemon seats.js
 *                      
 * 
 *  Purpose         : check sheets available or not
 * 
 *  @description    : Schema created for all the required files
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

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
/*
create instance of Schema
*/
var mongoSchema = mongoose.Schema;
/*
define schema and validations
*/
var seatSchema = new mongoSchema({
    "movieName": { type: String, required: [true, "movie name is required"] },
    "bookedSeat": [{ type: String, required: [true, "bookedSeat is required"] }],
    "time": { type: String, required: [true, "time is required"] },
    "date": { type: String, required: [true, "date is required"] },
    "place": { type: String, required: [true, "place is required"] },
}, {
        timestamps: true
    });

/*
declare a function usermodel
*/
function seatmodel() { }
var seats = mongoose.model('seats', seatSchema);

/*
creata a signup function 
*/
seatmodel.prototype.seatBooked = (body, callback) => {
    console.log("movieName", body.movieName)
    console.log( "bookedSeat",body.bookedSeat),
   console.log("body=========>           ",body)

    /*
    check whether email is already exists or not
    */
    seats.find({ 'movieName': body.movieName, 'time': body.time, 'date': body.date }, (err, data) => {
        if (err) {
            console.log("Error in seatBooked seats schema ");
            return callback(err);
        } else if (data.length == 0) {
            console.log("data  length",data.length)
            console.log("data",data)
            console.log("No movie Available")
            var response = { "error": true, "message": "No movie Available", "errorCode": 404 };
            return callback(response);
        }
        /*
        if email is not there then create a new account
        */
        else {
            // const newUser = new user({
            //     "bookedSeat": body.bookedSeat,
            // });
            /*
            then save the new data
            */
            seats.update({ 'movieName': body.movieName, 'time': body.time, 'date': body.date },{"$push": { "bookedSeat": body.bookedSeat }},(err, result) => {
                if (err) {
                    console.log("error came");
                    console.log("error in model file", err);
                    return callback(err);
                } else {
                    console.log(body.bookedSeat);
                    console.log("data update successfully", result);
                    console.log("bookedSeat successfully");
                    callback(null, result);
                    console.log("no return statements ..bookedSeat successfully");

                }
            })
        }
    });

}



module.exports = new seatmodel();