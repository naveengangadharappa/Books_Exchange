const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const saltRounds = 10;//process.env.SALT_ROUNDS;
let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'booksdealingsystem@gmail.com',
        pass: '1BI16cs413'
    }
});

const salt = async function (data) {
    return new Promise((resolve, reject) => {
        try {
            //let saltkey = "My000K^Y";
            let saltkey = process.env.SALT_KEY;
            let tempdata = String(data);
            tempdata = saltkey.substring(0, 2) + tempdata.substring(0, tempdata.length / 2) + saltkey.substring(2, 5) + tempdata.substring(tempdata.length / 2 + 1, tempdata.length) + saltkey.substring(5, 8);
            resolve(tempdata.split('').reverse().join('')); //reverse of string
        } catch (err) {
            console.log(err);
            resolve("");
        }
    })
}

const generate_id = async () => {
    return new Promise((resolve, reject) => {
        //console.log(new Date().getTime());
        //console.log(new Date());
        console.log(Math.random() * Math.floor(1234598745));
        resolve(`${Math.round(Math.random() * Math.floor(1234598745) + new Date().getTime())}`);
    });
}

const mysqldatetime = () => {
    var date = new Date();
    return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
}

const get_currentDateTime=()=>{
    var dateTime = new Date();
    let date=`${dateTime.toISOString()}`.split('T');
    return date[0]+" "+dateTime.toLocaleTimeString();
}

const hashpassword = (rawpassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(rawpassword, saltRounds, function (err, hash) {
            if (err) {
                console.log(err);
                resolve({ status: false, message: "Error in password hashing" })
            } else {
                console.log("hash = ", hash)
                resolve({ status: true, password: hash })
            }
        });
    });
}

const comparepassword = (rawpassword, hashpswd) => {
    return new Promise((resolve, reject) => {
        console.log("rawpswd =" + rawpassword);
        console.log("hashpswd =" + hashpswd);
        /*if (rawpassword === hashpswd) {
            console.log("passowrd match");
            resolve({ status: true, passwordmatch: true })
        } else {
            resolve({ status: false, message: "error in password mathing" })
        }*/
        bcrypt.compare(rawpassword, hashpswd, function (err, result) {
            if (err) {
                resolve({ status: false, message: data.failuremessage })
            } else {
                console.log("passowrd match");
                resolve({ status: true, passwordmatch: result })
            }
        });
    });
}

const GenerateJWTToken = async (params) => {
    try {
        let token = jwt.sign({ data: params.stu_id }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
        return { status: true, token: token, message: "Token generation successfull" };
    } catch (err) {
        console.log(err);
        return { status: false, message: "Token generation Unsuccessfull" };
    }
}

// const verifiyJWTToken = async (params) => {
//     try {
//         let jwtres = jwt.verify(params.token, process.env.TOKEN_SECRET)
//         console.log("jwtres : ", jwtres);
//         if (jwtres) return { status: true, data: jwtres.data, message: "Token Verification successfull" };
//         else return { status: false, message: "Invalid token" };
//     } catch (err) {
//         return { status: false, message: "Invalid token" };
//     }
// }

const verifiyJWTToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log("Token  : ", token);
        if (token) {
            let jwtres = jwt.verify(token, process.env.TOKEN_SECRET)
            console.log("jwtres : ", jwtres);
            if (jwtres) 
                next();
            else {
                res.statusCode = 401;
                res.send({ status: false, message: "Invalid token please pass valid token" });
            }       
        } else {
            res.statusCode = 401;
            res.send({ status: false, message: "Required Verification Token in header" });
        }
    } catch (err) {
        res.statusCode = 403;
        res.send({ status: false, message: "Invalid token" });
    }
}


let emailfunc = function (params) {
    console.log(params.toemail)
    let mailOptions = {
        from: 'booksdealingsystem@gmail.com',
        to: params.toemail,
        subject: params.subject, // your Subject 
        text: params.text,  //'Your Account created Successfully'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const handle_ValidationError=(err, req, res, next) => {
    try {
        if (err instanceof ValidationError) {
            // At this point you can execute your error handling code
            res.json({ status: false,error_status:false,message: "Invalid Request", err: ValidationError });
            //res.status(400).send('invalid');
            next();
        }
        else next(err); // pass error on if not a validation error
    } catch(error){
        if(req.url=='/upload_file' || req.url=='/upload_files') 
            res.json({status:false,error_status:false,message:"Invalid Request",err:[{file:["file field required"]}]});
        else res.json({status:false,message:"Invalid Request"});
    }
}

module.exports={handle_ValidationError,emailfunc,GenerateJWTToken,verifiyJWTToken,generate_id,salt,hashpassword,comparepassword,mysqldatetime,get_currentDateTime}