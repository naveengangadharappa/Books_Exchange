const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
const handleError= require('../Errors/errors');

const Seller_filter = {
    id:{
        stu_id:'required|alpha_num|between:9,12',
    },
    name:{
        stu_name: 'required|alpha_dash|between:2,100',
    },
    book_id:{
        book_id: 'required|between:2,100',
    },
    book_title:{
        book_name: 'required|alpha_dash|between:2,100',
       
    },
    book_author:{
        book_author:'required|alpha_dash|between:2,100',
       
    },
    book_university:{
        book_university:'required|alpha_dash|between:2,100',
    },
    book_collage:{
        book_collage:'required|alpha|between:2,100',  
    },
    book_branch:{
        book_branch: 'required|alpha|between:2,100',
    },
    book_sem:{
        book_sem: 'required|numeric|digits:2',
    },
    book_section:{
        book_section:'required|alpha|between:2,100',
    }   
};

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch (option) {
            case 'seller_filter':
                switch(body.choice){
                    case 'all':validation_result = {status:true};
                        break;
                    case 'title':
                        validation = new Validator(body, Seller_filter.name, errmsg.Seller_filter.name)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'id':
                        validation = new Validator(body, Seller_filter.id, errmsg.Seller_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                    break;
                    case 'bookid':
                        validation = new Validator(body, Seller_filter.book_id, errmsg.Seller_filter.bookid)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'bookname':
                        validation = new Validator(body, Seller_filter.book_title, errmsg.Seller_filter.booktitle)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'university':
                        validation = new Validator(body, Seller_filter.book_university, errmsg.Seller_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'sem':
                        validation = new Validator(body, Seller_filter.book_sem, errmsg.Seller_filter.sem)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'collage':
                        validation = new Validator(body, Seller_filter.book_collage, errmsg.Seller_filter.collage)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'author':
                        validation = new Validator(body, Seller_filter.book_author, errmsg.Seller_filter.author)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }break;
            default: validation_result = { status: false, message: "option cannot be identified" };
        }
        return validation_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Validation_Error_Logs.json');
        // error_result = await Log_Controllers.LogError('myId', err, './Logs/Validation_Error_Logs.json', Validation_error, 'json')
        // return { status: false, message: "Internal Server Error Please try Again" };
    }
}

module.exports = { validatedata}

//module.exports = { validatedata, handle_ValidationError }








