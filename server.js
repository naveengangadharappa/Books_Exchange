require('./DB/Mysql_connect');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyparser = require('body-parser');
const helmet = require('helmet');
//const routs = require('./Routs/Routs');
const auth_routs = require('./Routs/Auth_Routs');
const common_routs = require('./Routs/Common_Routs');
const file_routs = require('./Routs/File_Routs');
const order_routs = require('./Routs/Order_Routs');
const book_routs = require('./Routs/Book_Routs');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

const handleError = require('./Errors/errors');
const helpers=require('./helpers/helpers');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(morgan("dev"));

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) 
        return false;
    return compression.filter(req, res);
};

app.use(compression({
    filter: shouldCompress,
    threshold: 0,
    level:6
}));

app.use(helmet());

app.use(cors({
    origin: ['http://localhost:3000',],//your front url,
    methods: ['GET', 'POST'],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

app.use((err, req, res, next) => {   //middle ware to handle Error 
    handleError(res,err,err.message, 500, false,'./Logs/Server_Error_Logs.json');
});

app.use(async(err,req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("Token  : ", token);
    if (token) {
        let jwtresult = await helpers.verifiyJWTToken({ token });
        console.log("jwtresult =", jwtresult);
        if (jwtresult.status) 
            console.log("Jwt Token verification successfull");
        else    
            res.json({ status: false, message: "Invalid token please pass valid token" })
    } else 
        res.json({ status: false, message: "Required Verification Token in header" });
})


app.use('/BookExchange', auth_routs);
app.use('/BookExchange', file_routs);
app.use('/BookExchange', order_routs);
app.use('/BookExchange', common_routs);
app.use('/BookExchange', book_routs);


app.use('*', (req, res) => {
    handleError(res,{},'Page not found', 404, false,'./Logs/Server_Error_Logs.json');
});

process.on('uncaughtException', err => {             //when ever uncaught excdeption / error log error, send Admin alert
    //handleError(null,err,err.message, 500, false,'./Logs/Server_Error_Logs.json');
    console.log(`Uncaught Exception: ${err.message}`);
    // setTimeout(() => {
    //    process.exit(0) //Wait for log error, send Admin alert & exit or not exit
    // }, 10000).unref() 
})
  
let port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Express server started and listening on port ${port}`) });
