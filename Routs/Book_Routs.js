const express = require('express');
const router = express.Router();
const Urls=require('../Constants/Urls');
//const validationschema = require('../Validations/Validations');
//const books_validationschema = require('../Validations/Books_Validation');
const Books_Controllers = require('../Controllers/BooksController')
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

router.post(Urls.Books.Book_Operations, async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            switch(req.body.choice){
                case 'add':
                    validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'book_operations',res)
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'delete':
                    validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'book_operations',res)
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'update':
                    validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'book_operations',res)
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
                    break;
                case 'fetch':
                    validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'book_operations',res)
                    if (validation_result.status) {
                        result = await Books_Controllers.Book_Filter(req.body,res);
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

router.post(Urls.Books.Bookpic_Operations, async (req, res) => {
    try {
        if(req.body.choice){
            let validation_result;
            let result;
            let validatedata=Urls.Books.book_validationschema.validatedata;
            validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'Bookpic_Operations',res)
                    if (validation_result.status) {
                        result = await Books_Controllers.Bookpic_Operations(req.body,res);
                        res.json(result);
                    } else 
                        res.json(validation_result);
            // switch(req.body.choice){
            //     case 'add':
                    
            //         break;
            //     case 'delete':
            //         validation_result = await books_validationschema.validatedata(req.body, 'book_operations')
            //         if (validation_result.status) {
            //             result = await Books_Controllers.Bookpic_Operations(req.body,res);
            //             res.json(result);
            //         } else 
            //             res.json(validation_result);
            //         break;
            //     case 'update':
            //         validation_result = await books_validationschema.validatedata(req.body, 'book_operations')
            //         if (validation_result.status) {
            //             result = await Books_Controllers.Bookpic_Operations(req.body,res);
            //             res.json(result);
            //         } else 
            //             res.json(validation_result);
            //         break;
            //     case 'fetch':
            //         validation_result = await books_validationschema.validatedata(req.body, 'book_operations')
            //         if (validation_result.status) {
            //             result = await Books_Controllers.Bookpic_Filter(req.body,res);
            //             res.json(result);
            //         } else 
            //             res.json(validation_result);
            //         break;
            //     default : res.json({status:false,message:"Invalid choice passed,please pass valid choice "});
            //     break;
            // }
        }else res.json({status:false,message:"choice field is required please pass valid choice"});
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

router.post(Urls.Books.Book_Filter, async (req, res) => {
    try {
        //if(req.body.choice){
            let validation_result;
            let result;
            //console.log(Urls.Books.book_validationschema.validatedata);
            //let validatedata=Urls.Books.book_validationschema.validatedata;
            validation_result = await Urls.Books.book_validationschema.validatedata(req.body, 'book_filter',res)
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
        //}else res.json({status:false,message:"choice field is required please pass valid choice"});
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }     
})

//router.use(validationschema.handle_ValidationError);

router.use(helpers.handle_ValidationError)

module.exports = router;
