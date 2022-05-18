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
        stu_branch: 'required|alpha|between:2,50',
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

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch(body.choice){
            case 'login':
                validation = new Validator(body, Auth.login, errmsg.Auth.login)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };        
                break;
            case 'register': 
                validation = new Validator(body, Auth.register, errmsg.Auth.register)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            case 'passwordreset': 
                validation = new Validator(body, Auth.passwordreset, errmsg.Auth.passwordreset)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            case 'logout':
                validation = new Validator(body, Auth.logout, errmsg.Auth.logout)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            default : validation_result = {status:false,message:"Invalid choice passed,please pass valid choice"};
            break;
        }        
        return validation_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Validation_Error_Logs.json');
    }
}

module.exports = { validatedata}
//module.exports = { validatedata, handle_ValidationError }