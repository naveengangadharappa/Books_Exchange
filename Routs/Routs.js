const express = require('express');
const router = express.Router();
const validationschema = require('../Validations/Validations');
const Auth_Controllers = require('../Controllers/AuthController');
const Notification_Controllers = require('../Controllers/NotificationController')
const Books_Controllers = require('../Controllers/BooksController')
const Order_Controllers = require('../Controllers/OrderController')
const Feedback_Controllers = require('../Controllers/FeedBackController')
const Seller_Controllers = require('../Controllers/SellerController')
const handleError= require('../Errors/errors');
const multer = require('multer');
const path = require('path');   
const helpers=require('../helpers/helpers');

let storage = multer.diskStorage({
    destination:'assets/',
    filename: function (req, file, cb) { 
        fname=file.fieldname + '-' + Date.now()+ '.jpg'
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,
});
 
const upload1 = multer({
    storage: storage,
}).single('file');

const arrUpload = upload.array('file', 10); //limit uploading upto 10 files at one shot

router.get('/', (req, res) => {
    try{
        //req.split(023);
        res.json({ message: "Connected to Node Api server for Books Exchange. " })
    }catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
    //res.send( "A - Connected to Node Api server for Books Exchange. ".repeat(1000))
})

router.get('/get_file/:filename',(req,res)=>{
    try{
        console.log("file name params = ",req.params.filename)
        if(req.params.filename) 
            res.download(path.join('./assets',req.params.filename),req.params.filename);
        else res.json({status:false,Message:'Invalid File Name'});
    }catch(err){ 
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
})

router.post('/get_file',(req,res)=>{
    try{
        console.log("post get file entered");
        if(req.body.filename)
            res.download(path.join('./assets',req.body.filename),req.body.filename);
        else res.json({status:false,Message:'Invalid File Name'});
    }catch(err){ 
        console.log("Post get_file = ",err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
})

router.post('/upload_file',upload1,(req,res)=>{
    try{
        if(req.file)
            res.json({status:true,file_details:req.file,Message:"File upload Successfull"});
        else 
            res.json({status:false,Message:"File upload  Unsuccessfull"});
    }catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
   
})

router.post('/upload_files',arrUpload,(req,res)=>{
    try{
        if(req.files.length>0)
            res.json({status:true,file_details:req.files,Message:"Files upload Successfull"})
        else
            res.json({status:false,Message:"Files not upload plz try again"})
    } catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
})

//router.post('/Auth',helpers.verifiyJWTToken, async (req, res) => {
    router.post('/login', async (req, res) => {
        try {
                let validation_result;
                let result;
                validation_result = await validationschema.validatedata(req.body, 'auth')
                if (validation_result.status) {
                    result = await Auth_Controllers.Login(req.body,res,'session');
                    res.json(result);
                } else 
                    res.json(validation_result);                
        } catch (err) {
            console.log(err);
            handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
        }  
    });

router.post('/Auth', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'login':
                    validation_result = await validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Login(req.body,res,'session');
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'register': 
                    validation_result = await validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Register(req.body,res,req.sessionID)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'passwordreset': 
                    validation_result = await validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Passwordreset(req.body,res)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'logout':
                    validation_result = await validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Logout(req.body,res)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'get_login_status':
                        validation_result = await validationschema.validatedata(req.body, 'auth')
                        if (validation_result.status) {
                            result = await Auth_Controllers.Get_Login_status(req.body,res,req.sessionID)
                            res.json(result);
                        } else 
                            res.json(validation_result);
                        break;
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice"});
                break;
            }
        }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Notification', async (req, res) => {
    try {
        // if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'sms':
                    validation_result = await validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Sms_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'email':
                    validation_result = await validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Email_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'firebase':
                    validation_result = await validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Firebase_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'desktop':
                    validation_result = await validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Desktop_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;     
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice"});
                break;
            }
        // }else{

        // }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Book_Operations', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await validationschema.validatedata(req.body, 'book_operations')
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await validationschema.validatedata(req.body, 'book_operations')
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await validationschema.validatedata(req.body, 'book_operations')
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await validationschema.validatedata(req.body, 'book_operations')
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Filter(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice "});
                break;
            }
        }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Order_Operations', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await validationschema.validatedata(req.body, 'order_operations')
                    if (validation_result.status) {
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await validationschema.validatedata(req.body, 'order_operations')
                    if (validation_result.status) {
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await validationschema.validatedata(req.body, 'order_operations')
                    if (validation_result.status) {
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await validationschema.validatedata(req.body, 'order_operations')
                    if (validation_result.status) {
                        result = await Order_Controllers.Order_Filter(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice"});
                break;
            }
        }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Submit_feedback', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Filter(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice "});
                break;
            }
        }      
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Book_Filter', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            validation_result = await validationschema.validatedata(req.body, 'book_filter')
            if (validation_result.status) {
                result = await Books_Controllers.Book_Filter(req.body);
                res.json(result);
            } else 
                res.json(validation_result);
            // switch(req.body.choice){
            //     case 'title':
            //         validation_result = await validationschema.validatedata(req.body, 'book_filter')
            //         if (validation_result.status) {
            //             result = await Books_Controllers.Book_Filter(req.body);
            //             res.json(result);
            //         } else 
            //             res.json(validation_result);
            //         break;
            //     case 'id':
            //         validation_result = await validationschema.validatedata(req.body, 'book_filter')
            //         if (validation_result.status) {
            //             result = await Books_Controllers.Book_Filter(req.body);
            //             res.json(result);
            //         } else 
            //             res.json(validation_result);
            //         break;
            //     case 'sector':
            //         break;
            //     case 'branch':
            //         break;
            //     case 'university':
            //         break;
            //     case 'sem':
            //         break;
            //     case 'college':
            //         break;
            //     default : res.json({status:false,message:"Invalid choice passed,please pass valid choice"});
            //     break;
            // }
        }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Seller_Filter', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            validation_result = await validationschema.validatedata(req.body, 'seller_filter')
            if (validation_result.status) {
                result = await Seller_Controllers.Seller_Filter(req.body);
                res.json(result);
            } else
                res.json(validation_result);
            // switch(req.body.choice){
            //     case 'name':
            //         validation_result = await validationschema.validatedata(req.body, 'seller_filter')
            //         if (validation_result.status) {
            //             result = await Seller_Controllers.Seller_Filter(req.body);
            //             res.json(result);
            //         } else
            //             res.json(validation_result);
            //         break;
            //     case 'id':
            //         break;
            //     case 'bookid':
            //         break;
            //     default : res.json({status:false,message:"Invalid choice passed,please pass valid choice"});
            //         break;
            // }
        }
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

// router.use(function (err, req, res, next) {
//     try{
//         if (err instanceof ValidationError) {
//             // At this point you can execute your error handling code
//             res.json({ status: false,error_status:false,message: "Invalid Request", err: ValidationError });
//             //res.status(400).send('invalid');
//             next();
//         }
//         else next(err); // pass error on if not a validation error
//     }catch(error){
//         if(req.url=='/upload_file' || req.url=='/upload_files') 
//             res.json({status:false,error_status:false,message:"Invalid Request",err:[{file:["file field required"]}]});
//         else res.json({status:false,message:"Invalid Request"});
//     }
    
// });
// const handle_ValidationError=(err, req, res, next)=>{
//     try{
//         if (err instanceof ValidationError) {
//             // At this point you can execute your error handling code
//             res.json({ status: false,error_status:false,message: "Invalid Request", err: ValidationError });
//             //res.status(400).send('invalid');
//             next();
//         }
//         else next(err); // pass error on if not a validation error
//     }catch(error){
//         if(req.url=='/upload_file' || req.url=='/upload_files') 
//             res.json({status:false,error_status:false,message:"Invalid Request",err:[{file:["file field required"]}]});
//         else res.json({status:false,message:"Invalid Request"});
//     }
// }

//router.use(validationschema.handle_ValidationError)

router.use(helpers.handle_ValidationError)


// router.post('/seed_data', async (req, res) => {
//     try {
//         // for seeding Json data to MYSQL
//         let result = await DB_Controllers.Seed_Data();
//         res.json(result);
//     } catch (err) {
//         console.log(err);
//     }
// })  


module.exports = router;