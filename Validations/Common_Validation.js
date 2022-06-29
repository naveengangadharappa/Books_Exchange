const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
const handleError= require('../Errors/errors');



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

const all_validation = {
    Notification,
    feedback
}
const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch (option) {
            case 'notification':
                switch(body.choice){
                    case 'sms':
                        validation = new Validator(body, Notification.sms, errmsg.Notification.sms)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'email': 
                        validation = new Validator(body, Notification.email, errmsg.Notification.email)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'firebase': 
                        validation = new Validator(body, Notification.firebase, errmsg.Notification.firebase)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'desktop':
                        validation = new Validator(body, Notification.desktop, errmsg.Notification.desktop)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result = {status:false,message:"Invalid choice passed,please pass valid choice"};
                    break;
                }
                break;
            case 'submit_feedback':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, feedback.add, errmsg.feedback.add)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, feedback.delete, errmsg.feedback.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, feedback.update, errmsg.feedback.update)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, feedback.fetch, errmsg.feedback.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
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

module.exports = { validatedata,all_validation}

//module.exports = { validatedata, handle_ValidationError }








