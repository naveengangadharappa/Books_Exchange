let { mysqloperations } = require('../DB/Mysql_operations')
const handleError= require('../Errors/errors');
const helpers =require('../helpers/helpers')

//const {GenerateJWTToken,verifiyJWTToken,generate_id,salt,hashpassword,comparepassword,mysqldatetime,get_currentDateTime}=require('../helpers/helpers')

const Login = async (req_data,res,session_id) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        //console.log(session_id);
        //let sess_id='';
        let Result_data = {};
        params.sql = `select stu_id,stu_password from student where stu_id=?`;
        params.data = [req_data.stu_id];
        Result_data = await mysqloperations(params);
        if(Result_data.status && Result_data.data.length>0) {
            //hash and compare pswd;
            if(Result_data.data[0].stu_password == req_data.stu_password){
                params.option='',
                params.sql = `update student set login_status=?,session_id=?,device_details=?,Ip_Address=?,modified_time=? where stu_id=?`;
                params.data = [true,session_id,req_data.device_details,req_data.ip,helpers.get_currentDateTime(),req_data.stu_id];
                let Res_data = await mysqloperations(params);
                //console.log(Res_data);
                if(Res_data.status){
                    let jwt_token= await helpers.GenerateJWTToken(req_data);
                    Result_data = {status:true,jwt_token:jwt_token.token,message:"Login Successfull"}
                }else
                    Result_data = {status:false,message:"Login UnSuccessfull"} 
            }else
                Result_data={status:false,message:"Invalid password Please check your password and Try Again"} 
        }else
            Result_data={status:true,message:"USN/Roll No doesn't exists  please use SignUp"}    
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Register = async (req_data,res,session_id) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
        params.sql = `select * from student where stu_id=?`;
        params.data = [req_data.stu_id];
        Result_data = await mysqloperations(params);
        if(Result_data.status && Result_data.data.length>0){
            params.sql = `insert into student(stu_id,s_name,s_branch,s_sem,s_email,s_phone,s_clg,passwd,login_status,session_id,device_details,Ip_Address,remember_me) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`; //login_status
            params.data = [req_data.stu_id,req_data.stu_name,req_data.stu_branch,req_data.stu_sem,req_data.stu_email,req_data.stu_phone,req_data.stu_clg,req_data.stu_password,true,session_id,req_data.device_details,req_data_ip,req_data.remember_me];
            Result_data = await mysqloperations(params);
        }else
            Result_data={status:true,message:"USN/Roll No is already Registered please use SignIn"}    
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Passwordreset = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
        params.sql = `select * from student where stu_id=?`;
        params.data = [req_data.stu_id];
        Result_data = await mysqloperations(params);
        if(Result_data.status && Result_data.data.length>0){
            params.sql = `update student set stu_password=?,modified_time=?,login_status=? where stu_id=?`;
            params.data = [req_data.stu_password,helpers.get_currentDateTime(),false,req_data.stu_id];
            let Res_data = await mysqloperations(params);
            if(Res_data.status)
                Result_data = {status:true,data:Res_data.data,logout:true,message:"Password Reset Successfull"}
            else
                Result_data = {status:false,logout:true,message:"Password Reset UnSuccessfull"}
        }else
            Result_data={status:true,message:"USN/Roll No doesn't exists please use SignUp"}    
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Logout = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
        params.sql = `select * from student where stu_id=?`;
        params.data = [req_data.stu_id];
        Result_data = await mysqloperations(params);
        if(Result_data.status && Result_data.data.length>0){
            params.sql = `update student set login_status=?,remember_me=? where stu_id=?`;
            params.data = [false,false,req_data.stu_id];
            Result_data = await mysqloperations(params);
        }else
            Result_data={status:true,message:"USN/Roll No doesn't exists please use SignUp"}    
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Get_Login_status = async (req_data,res,session_id) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
        params.sql = `select login_status,device_details,Ip_Address,session_id,remember_me from student where stu_id=?`;
        params.data = [req_data.stu_id];
        Result_data = await mysqloperations(params);
        //if rememberme= true req.deviceid= same and loginstatus:true, ip=same
        if(req_data.deviceid==Result_data.data.device_details.deviceid && Result_data.data.login_status==true && Result_data.data.remember_me==true)
        if(Result_data.status && Result_data.data.length>0){
            params.sql = `update student set login_status=?,session_id=?,device_details=?,Ip_Address=?,modified_time=? where stu_id=?`
            params.data = [true,session_id,req_data.device_details,req_data.ip,helpers.get_currentDateTime(),req_data.stu_id];
            // params.sql = `update student set session_id=? where stu_id=?`
            // params.data = [session_id,req_data.stu_id];
            Result_data = await mysqloperations(params);
        }else
            Result_data={status:true,message:"USN/Roll No doesn't exists please use SignUp"}    
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

module.exports = { Login,Logout,Passwordreset,Register,Get_Login_status}