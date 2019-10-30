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
    "bookedSeat": { type: String, required: [true, "bookedSeat is required"] },
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

    /*
    check whether email is already exists or not
    */
    user.find({ 'email': body.email }, (err, data) => {
        if (err) {
            console.log("Error in signup user schema ");
            return callback(err);
        } else if (data.length > 0) {
            console.log("Email already exists!")
            var response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        }
        /*
        if email is not there then create a new account
        */
        else {
            const newUser = new user({

                "firstname": body.firstname,
                "lastname": body.lastname,
                "email": body.email,
                "phone": body.phone,
                "gender": body.gender,
                "dateofbirth": body.dateofbirth,
                "password": hash(body.password)
            });
            /*
            then save the new data
            */
            newUser.save((err, result) => {
                if (err) {
                    console.log("error came");
                    console.log("error in model file", err);
                    return callback(err);
                } else {
                    console.log(body.firstname);
                    console.log("data save successfully", result);
                    console.log("registered successfully");
                    callback(null, result);
                    console.log("no return statements ..registered successfully");

                }
            })
        }
    });

}



module.exports = new seatmodel();