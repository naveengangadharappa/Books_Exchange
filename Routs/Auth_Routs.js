const express = require('express');
const router = express.Router();
//const validationschema = require('../Validations/Validations');
//const auth_validationschema = require('../Validations/Auth_Validation');
const Urls=require('../Constants/Urls');
const Auth_Controllers = require('../Controllers/AuthController');
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

/**
   * @swagger
   * /login:
   *   post:
   *     description: Login Service to the BooKExchange 
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Students'
   *     responses:
   *       200:
   *         description: login Service Response
   *         content:
   *            application/json:
   *                schema:
   *                    type: object
   *            properties:
   *                message:
   *                    type: string
   *                status:
   *                    type: boolean
*/

router.post(Urls.Auth.Login, async (req, res) => {
    try {
        let validation_result;
        let result;
        validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'login')
        if (validation_result.status) {
            let session=req.session;
            console.log("session = ",session.id);
            result = await Auth_Controllers.Login(req.body,res,session.id);
            res.json(result);
        } else 
            res.json(validation_result);                    
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post(Urls.Auth.Signup, async (req, res) => {
    try {
        let validation_result;
        let result;
        validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'signup')
        if (validation_result.status) {
            result = await Auth_Controllers.Register(req.body,res)
            res.json(result);
        } else 
            res.json(validation_result);                
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post(Urls.Auth.PasswordReset, async (req, res) => {
    try {
            let validation_result;
            let result;
            validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'passwordreset')
                if (validation_result.status) {
                    result = await Auth_Controllers.Passwordreset(req.body,res)
                    res.json(result);
                } else 
                    res.json(validation_result);               
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post(Urls.Auth.Logout, async (req, res) => {
    try {
            let validation_result;
            let result;
            validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'logout')
                if (validation_result.status) {
                    result = await Auth_Controllers.Logout(req.body,res)
                    res.json(result);
                } else 
                    res.json(validation_result);                
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post(Urls.Auth.Get_login_status, async (req, res) => {
    try {
            let validation_result;
            let result;
            validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'getlogin_status')
            if (validation_result.status) {
                let session=req.session;
                console.log("session = ",req.session);
                result = await Auth_Controllers.Get_Login_status(req.body,res,session.id)
                res.json(result);
            } else 
                res.json(validation_result);               
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post('/Address_operation', async (req, res) => {
    try {
            let validation_result;
            let result;
            validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'address_operation')
            if (validation_result.status) {
                //let session=req.session;
                //console.log("session = ",req.session);
                result = await Auth_Controllers.Address_Operations(req.body,res)
                res.json(result);
            } else 
                res.json(validation_result);               
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
});

router.post('/Profilepic_Operations', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            validation_result = await Urls.Auth.auth_validationschema.validatedata(req.body, 'Profilepic_Operations')
            if (validation_result.status) {
                result = await Auth_Controllers.Profilepic_Operations(req.body,res);
                res.json(result);
            } else 
                res.json(validation_result);        
        }else res.json({status:false,message:"choice field is required please pass valid choice"});
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post('/Auth', async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'login':
                    validation_result = await auth_validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Login(req.body,res,'session');
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'register': 
                    validation_result = await auth_validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Register(req.body,res,req.sessionID)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'passwordreset': 
                    validation_result = await auth_validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Passwordreset(req.body,res)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'logout':
                    validation_result = await auth_validationschema.validatedata(req.body, 'auth')
                    if (validation_result.status) {
                        result = await Auth_Controllers.Logout(req.body,res)
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'get_login_status':
                        validation_result = await auth_validationschema.validatedata(req.body, 'auth')
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

//router.use(handle_ValidationError)

router.use(helpers.handle_ValidationError)
  
module.exports = router;