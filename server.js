/******************************************************************************
 *  Execution       : default node          : cmd> nodemon server.js
 *                      
 * 
 *  Purpose         : Room chatting with two peoples
 * 
 *  @description    
 * 
 *  @file           : ChatApp application
 *  @overview       : Connect and chat with two peoples
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 18-mar-2019
 *
 ******************************************************************************/
/*
required files
*/
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('../Application - Backend/routes/route');
const server = require('http').createServer(app)
const ioSocket = require('socket.io').listen(server);
var controllerChat = require('./controller/chatController')
var expressValidator = require('express-validator')
require('dotenv').config();
app.use(cors());

/*
Parses the text as URL encoded data (which is how browsers tend to send form data from regular 
forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.
*/
app.use(bodyParser.urlencoded({ extended: true }));

/*
Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());
app.use(expressValidator());

/*
server is listen 4000 port 
*/
server.listen(4000, () => {
    console.log("Server is listening to port 4000");
})

/*
connect server and client uses by socket.io
*/
var connections=[];
ioSocket.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log("connected: %s sockets connected",connections.length);
    /*
    event is connected and listen, and socket.on wait for callback to called the function
    */
    socket.on('createMessage', function (message) {
        controllerChat.addMessage(message, (err, data) => {
            if (err) {
                console.log("Error on message");
                console.log(err);
            } else {
                console.log(data + "show in server");
                /*
                emit is used to emit the message to all sockets connected to it.
                */
                ioSocket.sockets.emit('startMessage', data);
            }

        })

    })
    /*
     socket emit disconnect event which will be called whenever client disconnect
    */
    socket.on('disconnect', function () {
        console.log("socket disconnected..!!!")
    });
});


/*
calling router
*/
app.use('/', route);

/*
this is used for connect frontend to backend dynamically
*/
app.use(express.static('../frontend'));
mongoose.Promise = global.Promise;

/*
connect config and send to the mongoose connectivity
*/
const dbConfig = require('./config/dbConfig');

/*
connection to the mongo database
*/
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("successfully connected to database");
}).catch(err => {
    console.log("could not connect to the database");
    process.exit();
});

