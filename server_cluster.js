//with Pm2 no need for this cluster module and manual writing of code

//use pm2 start app.js -i 0            if we set i=0 it will only create workers as number of cores available
// i defines number of workers to be created

require('./DB/Mysql_connect');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const routs = require('./Routs/Routs');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config();

const handleError = require('./Errors/errors');
const helpers=require('./helpers/helpers');

const app = express();

const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
 
if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    
    // Fork workers.  Do not create workers more then number of cores because that will reduce performance in scheduling jobs
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    console.log(`Worker ${process.pid} started`);
 
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

    app.use('/BookExchange', routs);
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

}









