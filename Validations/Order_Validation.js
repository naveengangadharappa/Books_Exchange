const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
const handleError= require('../Errors/errors');

const Order_Operations = {
    add:{
        buyer_id: 'required|alpha_num|between:9,12',
        book_id: 'required',
        book_price:'required|numeric|digits_between:1,5',
        seller_id:'required|alpha_num|between:9,12',
    },
    delete:{
        order_id: 'required',
    },
    update:{
        buyer_id: 'required|alpha_num|between:9,12',
        book_id: 'required',
        order_id: 'required',
        book_price:'required|numeric|digits_between:0,1',
        seller_id:'required|alpha_num|between:9,12',
    },
    fetch:{
        order_id: '',
        buyer_id: '',
        book_id: '',
        book_price:'numeric|digits_between:0,1',
        seller_id:'',
    }
};

const Order_filter = {
    order_id:{
        order_id:'required|alpha_num|between:9,12',
    },
    book_id:{
        book_id: 'required|between:2,100',
    },
    seller_id:{
        seller_id: 'required|alpha_dash|digits_between:9,12',  
    },
    buyer_id:{
        buyer_id:'required|alpha_dash|between:9,12', 
    },
    book_price:{
        book_price:'required|numeric|digits_between:1,12',
    }   
};

const all_validation = {
    Order_Operations,
    Order_filter
}

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch (option) {
            case 'order_operations':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, Order_Operations.add, errmsg.Order_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, Order_Operations.delete, errmsg.Order_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Order_Operations.update, errmsg.Order_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Order_Operations.fetch, errmsg.Order_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
                break;
            case 'order_filter':
                switch(body.choice){
                    case 'buyer_id':
                        validation = new Validator(body, Order_filter.buyer_id, errmsg.Seller_filter.name)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        console.log(validation_result);
                        break;
                    case 'book_id':
                        validation = new Validator(body, Order_filter.book_id, errmsg.Seller_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'book_price':
                        validation = new Validator(body, Order_filter.book_price, errmsg.Seller_filter.bookid)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'seller_id':
                        validation = new Validator(body, Order_filter.seller_id, errmsg.Seller_filter.booktitle)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        console.log(validation_result);
                        break;
                    case 'order_id':
                        validation = new Validator(body, Order_filter.order_id, errmsg.Seller_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result={status:true}
                        break;
                }
                break;
            default: validation_result = { status: false, message: "option cannot be identified" };
            break;
        }
        return validation_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Validation_Error_Logs.json');
        // error_result = await Log_Controllers.LogError('myId', err, './Logs/Validation_Error_Logs.json', Validation_error, 'json')
        // return { status: false, message: "Internal Server Error Please try Again" };
    }
}

module.exports = { validatedata,all_validation }

//module.exports = { validatedata, handle_ValidationError }








