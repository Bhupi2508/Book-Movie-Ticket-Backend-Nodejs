/******************************************************************************
 *  Execution       : default node          : cmd> nodemon chatService.js
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
 *  @since          : 25-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
var movieModel = require('../app/models/movieModels')

/*
send message or add message by sender
*/
/*
for signup 
*/
exports.movies = (req, callback) => {
    console.log('In movie services', req)
    /*
    send data to model and callback from there and here both
    */
    movieModel.movieDetail(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
for get all the data from the database
*/
exports.getAllMovieDetail = (req, callback) => {
    /*
   send data to model and callback from there and here both
   */
    movieModel.getAllMovieDetails(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}


/*
for get movie details from the database
*/
exports.getMovieDetail = (req, callback) => {
    /*
   send data to model and callback from there and here both
   */
    movieModel.getMovieDetails(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

/*
get user message from the data base and to the frontend
*/
// exports.userMsg = (req, callback) => {
//     console.log("user request")
//     /*
//     send data to model and callback from there
//     */
//     chatModel.userMsg(req, (err, data) => {
//         if (err) {
//             console.log("chat services is not working");
//             callback(err);
//         } else {
//             console.log("chat service is working fine")
//             callback(null, data);
//         }
//     })
// }
