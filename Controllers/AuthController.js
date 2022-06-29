let { mysqloperations } = require('../DB/Mysql_operations')
const handleError= require('../Errors/errors');
const helpers =require('../helpers/helpers')

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
            let hash = await helpers.comparepassword(req_data.stu_password,Result_data.data[0].stu_password);
            if(hash.status && hash.passwordmatch){
            //if(Result_data.data[0].stu_password == hash.password){//req_data.stu_password){
                let jwt_token= await helpers.GenerateJWTToken(req_data);
                params.option='',
                params.sql = `update student set login_status=?,session_id=?,device_details=?,Ip_Address=?,modified_time=? where stu_id=?`;
                params.data = [true,jwt_token.token,req_data.device_details,req_data.Ip_Address,helpers.get_currentDateTime(),req_data.stu_id];
                let Res_data = await mysqloperations(params);
                //console.log(Res_data);
                if(Res_data.status){
                    //let jwt_token= await helpers.GenerateJWTToken(req_data);
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
            Result_data={status:true,message:"USN/Roll No is already Registered please use SignIn"}    
        }else{
            let hash = await helpers.hashpassword(req_data.stu_password);
            //console.log("pswdhash = ",hash.password);
            let jwt_token= await helpers.GenerateJWTToken(req_data);
            params.option = '';
            params.sql = `insert into student(stu_id,s_name,s_branch,s_sem,s_email,s_phone,s_clg,login_status,stu_password,session_id,device_details,Ip_Address,remember_me) values (?,?,?,?,?,?,?,?,?,?,?,?,?)`; //login_status
            params.data = [req_data.stu_id,req_data.stu_name,req_data.stu_branch,req_data.stu_sem,req_data.stu_email,req_data.stu_phone,req_data.stu_clg,true,hash.password,jwt_token.token,req_data.device_details,req_data.Ip_Address,req_data.remember_me];
            Result_data = await mysqloperations(params);
            if(Result_data.status){
                //let jwt_token= await helpers.GenerateJWTToken(req_data);
                Result_data = {status:true,jwt_token:jwt_token.token,message:"Registration Successfull"}
            }else
                Result_data = {status:true,message:"Registration UnSuccessfull.Mobile number/Email used by oyher user please truy again "} 
        }
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
            let hash = await helpers.hashpassword(req_data.stu_password);
            //console.log("pswdhash = ",hash.password);
            params.option = '';
            params.option = '';
            params.sql = `update student set stu_password=?,modified_time=?,login_status=? where stu_id=?`;
            params.data = [hash.password,helpers.get_currentDateTime(),false,req_data.stu_id];
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
            params.option = '';
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
        if(Result_data.status && Result_data.data.length>0) {
            //console.log(Result_data.data);
            if(Result_data.data[0].Ip_Address==req_data.Ip_Address){
                if( Result_data.data[0].login_status && Result_data.data[0].remember_me ) {
                    let jwt_token= await helpers.GenerateJWTToken(req_data);
                    params.option = '';
                    params.sql = `update student set login_status=?,session_id=?,device_details=?,Ip_Address=?,modified_time=? where stu_id=?`
                    params.data = [true,jwt_token.token,req_data.device_details,req_data.Ip_Address,helpers.get_currentDateTime(),req_data.stu_id];
                    let Result_data1 = await mysqloperations(params);
                    if(Result_data1.status) 
                        Result_data = {status:true,jwt_token:jwt_token.token,login_status:true,message:"Successfull"}  
                    else Result_data={status:true,message:"DB Server Error"};
                } else
                    Result_data={status:true,login_status:false,message:"User logged out please continue with Signin"}
            } else
            Result_data={status:true,message:"Looks like New Device please continue with Signin"}
        } else
            Result_data={status:true,message:"DB Server Error"};
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Address_Operations = async (req_data,res) => {
    try {
        let params = {
            option: '',
            sql: ``,
            data: []
        }
        let Result_data = {};
        let filter = req_data.choice ? req_data.choice : '';
        let message = "";
        let Id="";
        switch (filter) {
            case "add":
                message="Address Added Successfull";
                Id=req_data.stu_id;
                params.sql = `insert into Address(stu_id,country,state,city,Address,MapLink) values(?,?,?,?,?,?)`;
                params.data = [req_data.stu_id,req_data.country,req_data.state,req_data.city,req_data.address,req_data.map_link]; 
                break;
            case "delete":
                message="Address Deleted Successfull";
                Id=req_data.stu_id;
                params.sql = `delete from Address where stu_id=?`;
                params.data = [req_data.stu_id];
                break;
            case "update":
                message="Address Updated Successfull";
                Id=req_data.stu_id;
                params.sql = `update Address set country=?,state=?,city=?,Address=?,MapLink=? where stu_id=?`;
                params.data = [req_data.country,req_data.state,req_data.city,req_data.address,req_data.map_link,req_data.stu_id];
                break;
            case "fetch":
                message="Address Fetched Successfull";
                Id=req_data.stu_id;
                params.option="fetchdata";
                params.sql = `select * from Address where stu_id=?`;
                params.data = [req_data.stu_id];
                break;
            default:params.option="fetchdata";
                params.sql = `select * from Address`;
        }
        Result_data = await mysqloperations(params);
        if(Result_data.status){
            Result_data.message=message;
            Result_data.book_id=Id;
        } 
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Profilepic_Operations = async (req_data) => {
    try {
        let params = {
            option: '',
            sql: ``,
            data: []
        }
        let Result_data = {};
        let filter = req_data.choice ? req_data.choice : '';
        let message = "";
        let Id="";
        switch (filter) {
            case "add":
                message="Profile Picture Added Successfull";
                Id=req_data.stu_id;
                params.sql = `insert into picture(stu_id,pic_id) values(?,?)`;
                params.data = [req_data.stu_id,req_data.file_id]; 
                break;
            case "delete":
                message="Profile Picture Deleted Successfull";
                Id=req_data.stu_id;
                params.sql = `delete from picture where stu_id=?`;
                params.data = [req_data.stu_id];
                break;
            case "deletebyfile":
                message="Profile Picture Deleted Successfull";
                Id=req_data.file_id;
                params.sql = `delete from picture where pic_id=?`;
                params.data = [req_data.file_id];
                break;
            case "update":
                message="Profile Picture Updated Successfull";
                Id=req_data.stu_id;
                params.sql = `update picture set pic_id=? where stu_id=?`;
                params.data = [req_data.file_id,req_data.stu_id];
                break;
            case "fetch":
                message="Profile Picture fetched Successfull";
                params.option='fetchdata';
                params.sql = `select * from picture where stu_id=?`;
                params.data = [req_data.stu_id];
                break;
            default: params.sql = `select * from picture`;
        }
        Result_data = await mysqloperations(params);
        if(Result_data.status) {
            Result_data.message=message;
            Result_data.stu_id=Id;
        } 
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

module.exports = { Login,Logout,Passwordreset,Register,Get_Login_status,Address_Operations,Profilepic_Operations}