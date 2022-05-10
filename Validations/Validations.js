const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
const handleError= require('../Errors/errors');

const Auth = {
    login:{
        stu_email: 'required|email',
        stu_id:'required|alpha_num|between:9,12',
        stu_password: 'required|between:8,20',
        //session_id:'required|alpha_dash',
        device_details:'required',
        Ip_Address:'required',
    },
    register:{
        stu_id: 'required|alpha_num|between:9,12',
        stu_name: 'required|alpha_dash|between:2,100',
        stu_branch: 'required|alphabetween:2,50',
        stu_sem: 'required|numeric|digits:2',
        stu_email: 'required|email',
        stu_phone: 'required|numeric|digits:10',//min:1000000000|max:9999999999',
        stu_clg: 'required|alpha|between:2,100',
        stu_password: 'required|between:8,20',
        session_id:'required|alpha_dash',
        device_details:'required',
        Ip_Address:'required',
        remember_me:'required|boolean'
    },
    passwordreset:{
        stu_email: 'required|email',
        stu_id:'required|min:1000000000|max:999999999999999|between:2,100',
        stu_password: 'required|min:1000000000|max:999999999999999|between:8,20'
    },
    logout:{
        stu_email: 'required|email',
        stu_id:'required|alpha_num|between:9,12',
        //stu_password: 'required|min:1000000000|max:999999999999999'
    },
    getlogin_status:{
        stu_id:'required|alpha_num|between:9,12',
        session_id:'required|alpha_dash',
        device_details:'required',
        Ip_Address:'required',
    }
};

const Notification = {
    sms:{
        stu_phone: 'numeric|digits:10',
        stu_id:'required|alpha_num|between:9,12',
        subject:'required',
        body_text:'required',
    },
    email:{
        stu_email: 'email',
        stu_id:'required|alpha_num|between:9,12',
        subject:'required',
        body_text:'required',
    },
    firebase:{
        firebase_token:'required',//|max:999999999999999'
        stu_id:'required|alpha_num|between:9,12',
        subject:'required',
        body_text:'required',
    },
    desktop:{

    }
};

const Book_Operations = {
    add:{
        //book_id: 'required',required|alpha'
        book_name: 'required|alpha_dash|between:2,100',
        book_author:'required|alpha_dash|between:2,100',
        book_branch: 'required|alpha|between:2,100',
        book_edition: 'required|alpha_num|between:2,100',
        book_sem: 'required|numeric|digits:1',
        book_section:'required|alpha|between:2,100',
        book_university:'required|alpha_dash|between:2,100',
    },
    delete:{
        book_id: 'required|between:2,100',
        book_name: 'alpha_dash|between:2,100',
        book_author:'alpha_dash|between:2,100',
        book_branch: 'alpha|between:2,100',
        book_sem: 'numeric|digits:1',
        book_section:'alpha|between:2,100',
        book_university:'alpha_dash|between:2,100',
    },
    update:{
        book_id: 'required|between:2,100',
        book_name: 'required|alpha_dash|between:2,100',
        book_author:'required|alpha_dash|between:2,100',
        book_branch: 'required|alpha|between:2,100',
        book_edition: 'required|alpha_num|between:2,100',
        book_sem: 'required|numeric|digits:2',
        book_section:'required|alpha|between:2,100',
        book_university:'required|alpha_dash|between:2,100',
    },
    fetch:{
        book_id: 'between:2,100',
        book_name: 'alpha_dash|between:2,100',
        book_author:'alpha_dash|between:2,100',
        book_branch: 'alpha|between:2,100',
        book_sem: 'numeric|digits:2',
        book_section:'alpha|between:2,100',
        book_university:'alpha_dash|between:2,100',
    }
};

const feedback = {
    add:{
        feedback_msg:'required',
        stu_id:'required|alpha_num|between:9,12',
    },
    delete:{
        feedback_id:'required',
        stu_id:'alpha_num|between:9,12',
    },
    update:{
        feedback_id:'required',
        feedback_msg:'required',
        stu_id:'required|alpha_num|between:9,12',
    },
    fetch:{
        feedback_id:'required',
        feedback_msg:'required',
        stu_id:'required|alpha_num|between:9,12',
    }
};

const Order_Operations = {
    add:{
        buyer_id: 'required',
        book_id: 'required',
        book_price:'required|alpha_num|between:1,6',
        seller_id:'required',
    },
    delete:{
        order_id: 'required',
    },
    update:{
        buyer_id: 'required',
        book_id: 'required',
        order_id: 'required',
        book_price:'required|alpha_num|between:1,6',
        seller_id:'required',
    },
    fetch:{
        order_id: '',
        buyer_id: '',
        book_id: '',
        book_price:'alpha_num|between:1,6',
        seller_id:'',
    }
};

const Order_filter = {
    order_id:{
        stu_id:'required|alpha_num|between:9,12',
    },
    book_id:{
        book_id: 'required|between:2,100',
    },
    seller_id:{
        book_name: 'required|alpha_dash|between:2,100',
       
    },
    buyer_id:{
        book_author:'required|alpha_dash|between:2,100',
       
    },
    book_price:{
        book_university:'required|alpha_dash|between:2,100',
    }   
};

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

const book_filter = {
    book_id:{
        book_id: 'required',
    },
    book_name:{
        book_name: 'required|alpha_dash|between:2,100',
    },
    book_branch:{
        book_branch: 'required|alpha|between:2,100',
    },
    book_sem:{
        book_sem: 'required|numeric|digits:2',
    },
    book_university:{
        book_university:'required|alpha_dash|between:2,100',
    },
    book_author:{
        book_author:'required|alpha_dash|between:2,100',
    },
    book_edition:{
        book_edition:'required|alpha_dash|between:2,100',
    },
    book_sector:{
        book_section:'required|alpha|between:2,100',
    }    
};

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch (option) {
            case 'auth':
                switch(body.choice){
                    case 'login':
                        validation = new Validator(body, Auth.login, errmsg.Auth.login)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };        
                        break;
                    case 'register': 
                        validation = new Validator(body, Auth.register, errmsg.Auth.register)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'passwordreset': 
                        validation = new Validator(body, Auth.passwordreset, errmsg.Auth.passwordreset)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'logout':
                        validation = new Validator(body, Auth.logout, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result = {status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }
                break;
            case 'notification':
                switch(body.choice){
                    case 'sms':
                        validation = new Validator(body, Notification.sms, errmsg.Notification.sms)
                        validation_result = validation.fails() ? { status: false, message: 'Get_Time_Slots Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'email': 
                        validation = new Validator(body, Notification.email, errmsg.Notification.email)
                        validation_result = validation.fails() ? { status: false, message: 'Get_Time_Slots Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'firebase': 
                        validation = new Validator(body, Notification.firebase, errmsg.Notification.firebase)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'desktop':
                        validation = new Validator(body, Notification.desktop, errmsg.Notification.desktop)
                        validation_result = validation.fails() ? { status: false, message: 'List_houses Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result = {status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }
                break;
            case 'book_operations':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, Book_Operations.add, errmsg.Book_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, Book_Operations.delete, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Book_Operations.update, errmsg.Book_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Book_Operations.fetch, errmsg.Book_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
                break;
            case 'order_operations':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, Order_Operations.add, errmsg.Order_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, Order_Operations.delete, errmsg.Order_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Order_Operations.update, errmsg.Order_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Order_Operations.fetch, errmsg.Order_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
                break;
            case 'book_filter':
                switch(body.choice){
                    case 'all':validation_result = {status:true};
                        break;
                    case 'title':
                        validation = new Validator(body, book_filter.title, errmsg.book_filter.title)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'id':
                        validation = new Validator(body, book_filter.id, errmsg.book_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                    break;
                    case 'sector':
                        validation = new Validator(body, book_filter.book_sector, errmsg.book_filter.sector)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'branch':
                        validation = new Validator(body, book_filter.book_branch, errmsg.book_filter.branch)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'university':
                        validation = new Validator(body, book_filter.book_university, errmsg.book_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'sem':
                        validation = new Validator(body, book_filter.book_sem, errmsg.book_filter.sem)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'edition':
                        validation = new Validator(body, book_filter.book_edition, errmsg.book_filter.collage)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'author':
                        validation = new Validator(body, book_filter.book_author, errmsg.book_filter.author)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }
                break;
            case 'submit_feedback':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, feedback.add, errmsg.feedback.add)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, feedback.delete, errmsg.feedback.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, feedback.update, errmsg.feedback.update)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, feedback.fetch, errmsg.feedback.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }break;
            case 'seller_filter':
                switch(body.choice){
                    case 'all':validation_result = {status:true};
                        break;
                    case 'title':
                        validation = new Validator(body, Seller_filter.name, errmsg.Seller_filter.name)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'id':
                        validation = new Validator(body, Seller_filter.id, errmsg.Seller_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                    break;
                    case 'bookid':
                        validation = new Validator(body, Seller_filter.book_id, errmsg.Seller_filter.bookid)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'bookname':
                        validation = new Validator(body, Seller_filter.book_title, errmsg.Seller_filter.booktitle)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'university':
                        validation = new Validator(body, Seller_filter.book_university, errmsg.Seller_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'sem':
                        validation = new Validator(body, Seller_filter.book_sem, errmsg.Seller_filter.sem)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'collage':
                        validation = new Validator(body, Seller_filter.book_collage, errmsg.Seller_filter.collage)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'author':
                        validation = new Validator(body, Seller_filter.book_author, errmsg.Seller_filter.author)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }break;
            case 'order_filter':
                switch(body.choice){
                    case 'buyer_id':
                        validation = new Validator(body, Order_filter.buyer_id, errmsg.Seller_filter.name)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'book_id':
                        validation = new Validator(body, Order_filter.book_id, errmsg.Seller_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                    break;
                    case 'book_price':
                        validation = new Validator(body, Order_filter.book_price, errmsg.Seller_filter.bookid)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'seller_id':
                        validation = new Validator(body, Order_filter.seller_id, errmsg.Seller_filter.booktitle)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'order_id':
                        validation = new Validator(body, Order_filter.order_id, errmsg.Seller_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Book_visit Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice"};
                        break;
                }
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

module.exports = { validatedata, handle_ValidationError }








