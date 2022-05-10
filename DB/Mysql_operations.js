let mysqlconnection = require('./Mysql_connect');
let Log_Controllers = require('../Controllers/Log_Controllers');

const mysqloperations = async (params) => {
    //console.log(params);
    return new Promise((resolve, reject) => {
        switch (params.option) {
            case 'fetchdata':
                mysqlconnection.query(params.sql, params.data, async (err, rows, fields) => {
                    if (!err) {
                        //console.log("fetch your query executed", (params));
                        resolve({ status: true, data: rows, message: "Successfull"});
                    } else {
                        console.log(err);
                        //Log Error to Json file 
                        await Log_Controllers.LogError('myId', err, './Logs/DB_Error_Logs.json', 'DB-Module', 'json')
                        resolve({ status: false, message: "Internal Server Error Please try Again" });
                    }
                });
                break;
            default: //insert , delete, update
                mysqlconnection.query(params.sql, params.data, async (err) => {
                    if (!err) {
                        //resolve({ status: true, message: "Query Execution Successfull" })
                        resolve({ status: true, message: "Successfull" })
                    } else {
                        console.log(err);
                        //Log Error to Json file 
                        await Log_Controllers.LogError('myId', err, './Logs/DB_Error_Logs.json', 'DB-Module', 'json')
                        resolve({ status: false, message: "Internal Server Error Please try Again" });
                    }
                })
                break;
        }
    })
}

module.exports = { mysqloperations }