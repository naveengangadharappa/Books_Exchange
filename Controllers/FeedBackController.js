let { mysqloperations } = require('../DB/Mysql_operations')

const handleError= require('../Errors/errors');

const Feedback_Filter = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let house_list_result = {};
        let filter = req_data.choice ? req_data.choice : '';
        switch (filter) {
            case "id":
                params.sql = `select * from feedback where id=?`;
                params.data = [req_data.feedback_id];
                break;
            case "feedback_msg":
                params.sql = `select * from feedback where fmsg like '%${req_data.feedback_msg}%'`;
                params.data = [req_data.feedback_msg];
                break;
            case "stu_id":
                params.sql = `select * from feedback where stu_id=?`;
                params.data = [req_data.stu_id];
                break;
            default: params.sql = `select * from feedback`;
        }
        house_list_result = await mysqloperations(params);
        return house_list_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Feedback_Operations = async (req_data) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let house_list_result = {};
        let filter = req_data.choice ? req_data.choice : '';
        switch (filter) {
            case "add":
                let feedback_id=await helpers.generate_id()
                params.sql = `insert into feedback values(id,fmsg,stu_id)`;
                params.data = [feedback_id,req_data.feedback_msg,req_data.stu_id];
                break;
            case "delete":
                params.sql = `delete from feedback where id=?`;
                params.data = [req_data.feedback_id];
                break;
            case "update":
                params.sql = `update feedback set stu_id=?,fmsg=? where id=?`;
                params.data = [req_data.stu_id,req_data.feedback_msg,req_data.feedback_id];
                break;
            default: params.sql = `select * from feedback`;
        }
        house_list_result = await mysqloperations(params);
        return house_list_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}



module.exports = { Feedback_Filter, Feedback_Operations}