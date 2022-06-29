const express = require('express');
const router = express.Router();
//const order_validationschema = require('../Validations/Order_Validation');
//const seller_validationschema = require('../Validations/Seller_Validation');
const Order_Controllers = require('../Controllers/OrderController');
const Seller_Controllers = require('../Controllers/SellerController');
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');
const Urls=require('../Constants/Urls');

router.post(Urls.Orders.Order_Operations, async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await Urls.Orders.order_validationschema.validatedata(req.body, 'order_operations',res)
                    if (validation_result.status) {
                        if(req.body.buyer_id == req.body.seller_id) res.json({status:false,message:"Buyer and Seller cannot be same."});
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await Urls.Orders.order_validationschema.validatedata(req.body, 'order_operations',res)
                    if (validation_result.status) {
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await Urls.Orders.order_validationschema.validatedata(req.body, 'order_operations',res)
                    if (validation_result.status) {
                        if(req.body.buyer_id == req.body.seller_id) res.json({status:false,message:"Buyer and Seller cannot be same."});
                        result = await Order_Controllers.Order_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await Urls.Orders.order_validationschema.validatedata(req.body, 'order_operations',res)
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

router.post(Urls.Orders.Order_Filter, async (req, res) => {
    try {
            let validation_result;
            let result;
            validation_result = await Urls.Orders.order_validationschema.validatedata(req.body, 'order_filter',res)
            if (validation_result.status) {
                result = await Order_Controllers.Order_Filter(req.body);
                res.json(result);
            }else res.json(validation_result);   
        } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post(Urls.Orders.Seller_Filter, async (req, res) => {
    try {
        //if(req.body.choice){
        let validation_result;
        let result;
        validation_result = await Urls.Orders.seller_validationschema.validatedata(req.body, 'seller_filter',res)
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
       // }else res.json({status:false,message:"choice field is required please pass valid choice"});
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

//router.use(validationschema.handle_ValidationError)
router.use(helpers.handle_ValidationError)

module.exports = router;