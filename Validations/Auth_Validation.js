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
        Ip_Address:['required','regex:/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'],
    },
    register:{
        stu_id: 'required|alpha_num|between:9,12',
        stu_name: 'required|alpha_dash|between:2,100',
        stu_branch: 'required|alpha|between:2,50',
        stu_sem: 'required|numeric|digits_between:1,2',
        stu_email: 'required|email',
        stu_phone: 'required|numeric|digits_between:10,12',//min:1000000000|max:9999999999',
        stu_clg: 'required|alpha|between:2,100',
        stu_password: 'required|between:8,20',
        device_details:'required',
        Ip_Address:['required','regex:/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'],
        remember_me:'required|boolean'
    },
    passwordreset:{
        stu_email: 'required|email',
        stu_id:'required|alpha_num|between:9,12',
        stu_password: 'required|between:8,20'
    },
    logout:{
        stu_email: 'required|email',
        stu_id:'required|alpha_num|between:9,12',
        //stu_password: 'required|min:1000000000|max:999999999999999'
    },
    getlogin_status:{
        stu_id:'required|alpha_num|between:9,12',
        //session_id:'required|alpha_dash',
        device_details:'required',
        Ip_Address:['required','regex:/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'],
    }
};

const Address = {
    add:{
        stu_id:'required|alpha_num|between:9,12',
        country:'required|regex:/^[a-z0-9 ]+$/i|between:2,50',
        state:'required|regex:/^[a-z0-9 ]+$/i|between:2,50',
        city:'required|regex:/^[a-z0-9 ]+$/i|between:2,70',
        address:'required|regex:/^[a-z0-9 ]+$/i|between:2,250',
        map_link:'required|between:2,250'
    },
    delete:{
        stu_id:'required|alpha_num|between:9,12',
    },
    update:{
        stu_id:'required|alpha_num|between:9,12',
        country:'required|regex:/^[a-z0-9 ]+$/i|between:2,50',
        state:'required|regex:/^[a-z0-9 ]+$/i|between:2,50',
        city:'required|regex:/^[a-z0-9 ]+$/i|between:2,70',
        address:'required|regex:/^[a-z0-9 ]+$/i|between:2,250',
        map_link:'required|between:2,250'
    },
    fetch:{
        stu_id:'alpha_num|between:9,12',
        country:'regex:/^[a-z0-9 ]+$/i|between:2,50',
        state:'regex:/^[a-z0-9 ]+$/i|between:2,50',
        city:'regex:/^[a-z0-9 ]+$/i|between:2,70',
        address:'regex:/^[a-z0-9 ]+$/i|between:2,250',
        map_link:'between:2,250'
    }
}

const Profilepic_Operations = {
    add:{
        stu_id: 'required|alpha_num|between:9,12',
        file_id: 'required|between:0,100',
    },
    delete:{
        stu_id: 'required|alpha_num|between:9,12',
    },
    deletebyfile:{
        file_id: 'required|between:0,100',
    },
    update:{
        stu_id: 'required|alpha_num|between:9,12',
        file_id: 'required|between:0,100',
    },
    fetch:{
        stu_id: 'required|between:8,13',
    },
};

const all_validation = {
    Auth,
    Address,
    Profilepic_Operations
}

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        //switch(body.choice){
        switch(option){
            case 'login':
                validation = new Validator(body, Auth.login, errmsg.Auth.login)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };        
                break;
            case 'signup': 
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
            case 'getlogin_status':
                validation = new Validator(body, Auth.getlogin_status, errmsg.Auth.logout)
                validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                break;
            case 'address_operation':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, Address.add, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, Address.delete, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Address.update, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Address.fetch, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default:
                        validation = new Validator(body, Address.fetch, errmsg.Auth.logout)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                    break;
                }
                break;
            case 'Profilepic_Operations':
                switch(body.choice){
                    case 'add':
                        console.log("entered add")
                        validation = new Validator(body, Profilepic_Operations.add, errmsg.Book_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        console.log("Validation result = ",validation_result);
                        break;
                    case 'delete':
                        validation = new Validator(body, Profilepic_Operations.delete, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'deletebyfile':
                        validation = new Validator(body, Profilepic_Operations.deletebyfile, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Profilepic_Operations.update, errmsg.Book_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Profilepic_Operations.fetch, errmsg.Book_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
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

module.exports = { validatedata,all_validation}
//module.exports = { validatedata, handle_ValidationError }