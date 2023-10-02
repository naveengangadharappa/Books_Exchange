const express = require('express');
const router = express.Router();
//const validationschema = require('../Validations/Validations');
const Urls=require('../Constants/Urls');
const Notification_Controllers = require('../Controllers/NotificationController');
const Feedback_Controllers = require('../Controllers/FeedBackController');
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

/**
   * @swagger
   * /Get_AllRout_Params:
   *   get:
   *     description: Get all validation and requestion parameters for all routes
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Students'
   *     responses:
   *       200:
   *         description: Get_AllRout_Params Service Response
   *         content:
   *            application/json:
   *                schema:
   *                    type: object
   *            properties:
   *                message:
   *                    type: string
   *                status:
   *                    type: boolean
   *                
*/

//router.post('/Notification', async (req, res) => {
router.post(Urls.Common_Routs.Notification, async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'sms':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Sms_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'email':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Email_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'firebase':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Firebase_notification(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'desktop':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'notification')
                    if (validation_result.status) {
                        result = await Notification_Controllers.Desktop_notification(req.body,res);
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

router.post(Urls.Common_Routs.Submit_feedback, async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await Urls.Common_Routs.common_validationschema.validatedata(req.body, 'submit_feedback')
                    if (validation_result.status) {
                        result = await Feedback_Controllers.Feedback_Filter(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                default : res.json({status:false,message:"Invalid choice passed,please pass valid choice "});
                break;
            }
        }else res.json({status:false,message:"choice field is required please pass valid choice"});    
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.get('/Get_AllRout_Params', async (req, res) => {
    try {
        // const all_val={
        //     auth_validationschema,
        //     book_validationschema,
        //     order_validationschema,
        //     common_validationschema
        // }
        res.json(Urls);
    }catch(err){
        console.log(err);
    }
});

router.post('/Get_AllRout_Params', async (req, res) => {
    try {
        res.json(Urls);
    }catch(err){
        console.log(err);
    }
});
//router.use(validationschema.handle_ValidationError)
router.use(helpers.handle_ValidationError)

module.exports = router;