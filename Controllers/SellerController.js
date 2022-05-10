let { mysqloperations } = require('../DB/Mysql_operations')

const handleError= require('../Errors/errors');

const Seller_Filter = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let result_data = {};
        let filter = req_data.choice ? req_data.choice : '';
        switch (filter) {
            case "seller_id":
                params.sql = `select * from uploader where seller_id=?`;
                params.data = [req_data.seller_id];
                break;
            case "book_id":
                params.sql = `select * from uploader where book_id=?`;
                params.data = [req_data.book_id];
                break;
            case "order_id":
                params.sql = `select * from uploader where id=?`;
                params.data = [req_data.id];
                break;
            case "bookprice":
                params.sql = `select * from uploader where book_price like '%${req_data.title}%'`;
                params.data = [req_data.title];
                break;
            
            default: params.sql = `select * from uploader`;
        }
        result_data = await mysqloperations(params);
        return result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Seller_Operations = async (req_data) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
       // let filter = req_data.filter ? req_data.filter : '';
        switch (filter) {
            case "add":
                let seller_id=await helpers.generate_id()
                params.sql = `insert into uploader(seller_id,book_id,book_price) values(?,?,?)`;
                params.data = [seller_id,req_data.book_id,req_data.book_price]; 
                break;
            case "delete":
                params.sql = `delete from uploader where seller_id=?`;
                params.data = [req_data.order_id];
                break;
            case "update":
                params.sql = `update uploader set book_id=?,book_price=? where seller_id=`;
                params.data = [req_data.book_id,req_data.book_price,req_data.seller_id];
                break;
            default: params.sql = `select * from uploader`;
        }
        Result_data = await mysqloperations(params);
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}



module.exports = { Seller_Filter, Seller_Operations}