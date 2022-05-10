const express = require('express');
const router = express.Router();
const validationschema = require('../Validations/Validations');
const Auth_Controllers = require('../Controllers/AuthController');
const handleError= require('../Errors/errors');

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
    }else res.json({status:false,message:"choice field is required please pass valid choice"});
} catch (err) {
    console.log(err);
    handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
}     
})

const handle_ValidationError=(err, req, res, next)=>{
    try{
        if (err instanceof ValidationError) {
            // At this point you can execute your error handling code
            res.json({ status: false,error_status:false,message: "Invalid Request", err: ValidationError });
            //res.status(400).send('invalid');
            next();
        }
        else next(err); // pass error on if not a validation error
    }catch(error){
        if(req.url=='/upload_file' || req.url=='/upload_files') 
            res.json({status:false,error_status:false,message:"Invalid Request",err:[{file:["file field required"]}]});
        else res.json({status:false,message:"Invalid Request"});
    }
}

router.use(handle_ValidationError)



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