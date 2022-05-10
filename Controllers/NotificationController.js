let { mysqloperations } = require('../DB/Mysql_operations')

const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

const Email_notification = async (req_data,res) => {
    try {
        let response_data={};
        let params = {
            option: 'fetchdata',
            sql: `select s_email,s_phone from student where stu_id=?`,
            data: [req_data.stu_id]
        }
        result = await mysqloperations(params);
        if(result.status && result.data.length>0){
            let email_body={
                toemail:result.data[0].s_email,
                subject:req_data.subject,
                text:req_data.body_text,
            }
            let email_res = await helpers.emailfunc(email_body);
            let result_data=await Insert_notification(req_data,result.data[0].s_email,"booksdealingsystem@gmail.com");
            if(result_data.status)
                response_data={status:true,message:'Email Notification Sent Successfull'}
        }else response_data={status:true,message:'Sorry Student Id doesnot Exists Please check again'}
        return response_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Sms_notification = async (req_data,res) => {
    try {
        let response_data={};
        let params = {
            option: 'fetchdata',
            sql: `select s_email,s_phone from student where stu_id=?`,
            data: [req_data.stu_id]
        }
        result = await mysqloperations(params);
        if(result.status){
            let email_body={
                to:result.data[0].s_phone,
                subject:req_data.subject,
                text:req_data.body_text,
            }
            let email_res = await helpers.emailfunc(email_body);
            let result_data=await Insert_notification(req_data,result.data[0].s_phone);
            if(result_data.status)
                response_data={status:true,message:'Email Notification Sent Successfull'}
        }
        return response_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Firebase_notification = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let house_list_result = {};
        house_list_result = await mysqloperations(params);
        return house_list_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Desktop_notification = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let house_list_result = {};
        house_list_result = await mysqloperations(params);
        return house_list_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Insert_notification = async (req_data,to,from)=>{
    let Notification_id=await helpers.generate_id()
    let params = {
        option: 'insert',
        sql: 'insert into Notification (`id`,`type`,`from`,`to`,`stu_id`) values (?,?,?,?,?)',
        data: [Notification_id,req_data.choice,from,to,req_data.stu_id]
    }
    let result_data = await mysqloperations(params);
    return result_data;
}



module.exports = { Email_notification, Sms_notification,Firebase_notification,Desktop_notification}