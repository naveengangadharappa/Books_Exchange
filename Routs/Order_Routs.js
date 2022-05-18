const express = require('express');
const router = express.Router();
const validationschema = require('../Validations/Validations');
const Order_Controllers = require('../Controllers/OrderController');
const Seller_Controllers = require('../Controllers/SellerController');
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

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
        }else res.json({status:false,message:"choice field is required please pass valid choice"});
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
        }else res.json({status:false,message:"choice field is required please pass valid choice"});
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

//router.use(validationschema.handle_ValidationError)
router.use(helpers.handle_ValidationError)

module.exports = router;