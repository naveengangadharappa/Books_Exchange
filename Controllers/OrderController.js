let { mysqloperations } = require('../DB/Mysql_operations')

const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

const Order_Filter = async (req_data,res) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let result_data = {};
        let filter = req_data.choice ? req_data.choice : '';
        switch (filter) {
            case "buyer_id":
                params.sql = `select * from orders where buyer_id=?`;
                params.data = [req_data.buyer_id];
                break;
            case "book_id":
                params.sql = `select * from orders where book_id=?`;
                params.data = [req_data.book_id];
                break;
            case "seller_id":
                params.sql = `select * from orders where seller_id=?`;
                params.data = [req_data.seller_id];
                break;
            case "order_id":
                params.sql = `select * from orders where order_id=?`;
                params.data = [req_data.order_id];
                break;
            case "book_price":
                params.sql = `select * from orders where book_price=?`;
                params.data = [req_data.book_price];
                break;
            default: params.sql = `select * from orders`;
        }
        result_data = await mysqloperations(params);
        return result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Order_Operations = async (req_data) => {
    try {
        let params = {
            option: 'fetchdata',
            sql: ``,
            data: []
        }
        let Result_data = {};
        let filter = req_data.choice ? req_data.choice : '';
        switch (filter) {
            case "add":
                let order_id=await helpers.generate_id()
                params.sql = `insert into orders(buyer_id,book_id,book_price,seller_id,order_id) values(?,?,?,?,?)`;
                params.data = [buyer_id,req_data.book_id,req_data.book_price,req_data.seller_id,order_id]; 
                break;
            case "delete":
                params.sql = `delete from orders where order_id=?`;
                params.data = [req_data.order_id];
                break;
            case "update":
                params.sql = `update orders set buyer_id=?,book_id=?,book_price=?,seller_id=?,where order_id=`;
                params.data = [req_data.buyer_id,req_data.book_id,req_data.book_price,req_data.seller_id];
                break;
            default: params.sql = `select * from books`;
        }
        Result_data = await mysqloperations(params);
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}



module.exports = { Order_Filter, Order_Operations}