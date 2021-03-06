#!/usr/bin/env nodejs
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const session = require('express-session')
// var MySQLStore = require('express-mysql-session')(session)
// const mysql = require('mysql2/promise')
const cookieParser = require('cookie-parser')
const helpers = require('./config/helpers');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
//const jwt_decode = require('jwt-decode');
const helmet = require('helmet');
const compression = require('compression');
const xmlparser = require('express-xml-bodyparser');
const db = require('./database/db');

//import all games
let game = require('./seeders/202106292222-lottos')

//Load Environment Variables
require('dotenv').config();
//Connect to DataBase
require('./database/db');

// set security HTTP headers
app.use(helmet());

//sanitize request data
//app.use(xss());

//gzip compression
app.use(compression());

//Cross origin fix
app.use(cors());
//app.options('*', 'cors');

//session
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser())
app.use(session({secret: process.env.SECRET, resave: true, saveUninitialized: false, cookie: { maxAge: 600000 }}))

// Logger
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

//Parses requests body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Initialise Passport
app.use(passport.initialize());
//app.use(passport.session());

//Configure socket global
app.use(function (req, res, next){
    req.io = io;
    next();
});

//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method == "OPTIONS")
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }

    next();
})

// const sessionConfig = {
//     name: 'session',
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         expires: Date.now() + 1000 * 60 * 60 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }

// }

// let sessionConnection = mysql.createConnection(db)

// let sessionStore = new MySQLStore({
//     expiration: 10800000,
//     createDatabaseTable: true,
//     schema: {
//         tableName: 'session',
//         columnNames: {
//             session_id: 'session_id',
//             expires: 'expires',
//             data: 'data'
//         }
//     }
// }, sessionConnection)

// app.use(session({
//     key: 'keyin',
//     secret: process.env.SESSION_SECRET,
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false
// }))

//include route module
const publicRoute = require('./routes/public');
const authRoute = require('./routes/auth');
const { MemoryStore } = require('express-session');

//App Routes
app.use('/api/v1/', publicRoute);
app.use('/api/v2/auth/', authRoute);



// lottoExpress numbers

let arr = []

async function getResult() {
    
    setInterval(async () => {
        const number = Math.floor(Math.random() * 90) + 1
        const number1 = Math.floor(Math.random() * 90) + 1
        const number2 = Math.floor(Math.random() * 90) + 1
        const number3 = Math.floor(Math.random() * 90) + 1
        const number4 = Math.floor(Math.random() * 90) + 1
        arr = [number, number1, number2, number3, number4]
        let numberSet = new Set(arr)

        let array = [...numberSet]

        if (array.length < 5) {
            const num = Math.floor(Math.random() * 90) + 1
            array.push(num)

            let numSet = new Set(array)

            let newArray = [...numSet]

            var d = new Date();
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            var hours1 = d.getHours()
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();

            var time1 = hours1 + ":" + minutes + ":" + seconds
 
            var dates = `${year}-${month}-${date} ${time1}`

            await db.Gameresults.create({
                name: 'Lotto Express',
                odds: newArray.toString(),
                dates: dates
            })
            console.log(`Lotto express Odds from extra added array if previous array is less than 5: ${newArray}`)
        } else {
            var d = new Date();
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            var hours1 = d.getHours()
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();

            var time1 = hours1 + ":" + minutes + ":" + seconds
 
            var dates = `${year}-${month}-${date} ${time1}`

            await db.Gameresults.create({
                name: 'Lotto Express',
                odds: array.toString(),
                dates: dates
            })
            console.log(`lotto express  odds: ${array}`)
        }
    }, 1810000)
}

    
getResult()



// softLotto numbers
let setArr = []

async function getSoftLottoOdds() {

    setInterval( async() => {
        const number = Math.floor(Math.random() * 90) + 1
        const number1 = Math.floor(Math.random() * 90) + 1
        const number2 = Math.floor(Math.random() * 90) + 1
        setArr = [number, number1, number2]
        let numberSet = new Set(setArr)
        let array = [...numberSet]

        if (array.length < 3) {
            const num = Math.floor(Math.random() * 90) + 1
            array.push(num)

            let numSet = new Set(array)

            let newArray = [...numSet]

            var d = new Date();
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            var hours1 = d.getHours()
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();

            var time1 = hours1 + ":" + minutes + ":" + seconds
 
            var dates = `${year}-${month}-${date} ${time1}`

            await db.Gameresults.create({
                name: 'Lotto Express',
                odds: newArray.toString(),
                dates: dates
            })
            console.log(`Soft Lotto Odds from extra added array if previous array is less than 5: ${newArray}`)
        } else {
            var d = new Date();
            var minutes = d.getMinutes()
            var seconds = d.getSeconds()
            var hours1 = d.getHours()
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();

            var time1 = hours1 + ":" + minutes + ":" + seconds
 
            var dates = `${year}-${month}-${date} ${time1}`

            await db.Gameresults.create({
                name: 'soft Lotto',
                odds: array.toString(),
                dates: dates
            });

            console.log(`soft lotto odds: ${array}`)
        }

    }, 600000)

}
    
getSoftLottoOdds()
         

//Error handling
app.use( (err, req, res, next) => {
    const error = new Error(err.message);
    error.status = 401;
    next(error);
});

app.use((error, req, res, next) => {
    if(error.message == "Unauthorized from server")
    {
        return res.status(401).json(
            helpers.sendError("Email does not exist")
        );
    }
    
    res.status(error.status || 500);
    res.json({
        error: {
            status: "ERROR",
            message: error.message
        }
    })
})

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage
  
    if (err.errors) {
      // mongoose validation error
      errCode = 400 // bad request
      const keys = Object.keys(err.errors)
      // report the first validation error
      errMessage = err.errors[keys[0]].message
    } else {
      // generic or custom error
      errCode = err.status || 500
      errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
      .send(errMessage)
})

//Landing Page
app.use('/', function(req, res, next){
    res.status(200).json({ suceess: true });
});

const PORT = process.env.PORT || 3014;

http.listen(PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port: '+PORT);
    }
});
