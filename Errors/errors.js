let Log_Controllers = require('../Controllers/Log_Controllers');

errorResponse = async(res,error = {}, message, statusCode = 500, file_path='./Logs/Server_Error_Logs.json') => {
    //check whether a major error that breakdown server(if yes) restart server 
    let result = await Log_Controllers.LogError('latest', error,file_path, 'DB-Module', 'json')
    if(result.status) console.log("Error Logged Successfully --- > "+file_path);                    
    if(res){
        if(statusCode==404){
            res.status(404).json({
                status: false,
                message: 'Page not found',
                error: {
                statusCode: 404,
                message: 'The page you are requesting is not defined on this server !',
                },
            });
        }else{
            res.status(statusCode).json({
                success: false,
                message,
                error: {
                    statusCode,
                    message,
                    error,
                },
            });
        }
    }
};

module.exports = errorResponse;