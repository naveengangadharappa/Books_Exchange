let { mysqloperations } = require('../DB/Mysql_operations')
const handleError= require('../Errors/errors');
const helpers=require('../helpers/helpers');

const Book_Filter = async (req_data,res) => {
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
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b.b_id=? ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_id];
                break;
            case "title":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_name like '%${req_data.book_name}%' ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_name];
                break;
            case "author":
                    params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_author like '%${req_data.book_author}%' ORDER BY b.b_price ASC LIMIT 20`;
                    params.data = [req_data.book_author];
                    break;
            case "sector":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_section=? ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_section];
                break;
            case "branch":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_branch=? ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_branch];
                break;
            case "sem":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_sem=? ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_sem];
                break;
            case "edition":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_edition like '%${req_data.book_edition}%' ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_edition];
                break;
            case "university":
                params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid where b_university like '%${req_data.book_university}%' ORDER BY b.b_price ASC LIMIT 20`;
                params.data = [req_data.book_university];
                break;
            default: params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid ORDER BY b.b_price ASC LIMIT 20`;
        }
        house_list_result = await mysqloperations(params);
        return house_list_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}

const Book_Operations = async (req_data) => {
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
                let book_id=await helpers.generate_id();
                message="Books Added Successfull";
                Id=book_id;
                params.sql = `insert into book(b_id,b_name,b_author,b_edition,b_branch,b_sem,b_section,b_university,stu_id,b_price) values(?,?,?,?,?,?,?,?)`;
                params.data = [book_id,req_data.book_name,req_data.book_author,req_data.book_edition,req_data.book_branch,req_data.book_sem,req_data.book_section,req_data.book_university,req_data.stu_id,req_data.book_price]; 
                break;
            case "delete":
                message="Books Deleted Successfull";
                Id=req_data.book_id;
                params.sql = `delete from book where b_id=?`;
                params.data = [req_data.book_id];
                break;
            case "update":
                message="Books Updated Successfull";
                Id=req_data.book_id;
                params.sql = `update book set b_name=?,b_author=?,b_edition=?,b_branch=?,b_sem=?,b_section=?,b_university=?,b_price where b_id=?`;
                params.data = [req_data.book_name,req_data.book_author,req_data.book_edition,req_data.book_branch,req_data.book_sem,req_data.book_section,req_data.book_university,req_data.book_price,req_data.book_id];
                break;
            default: params.sql = `select * from book b LEFT JOIN bookpicture bp ON b.b_id=bp.bid ORDER BY b.b_price ASC LIMIT 20`;
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

const Bookpic_Operations = async (req_data) => {
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
                //let book_id=await helpers.generate_id();
                message="Book Picture Added Successfull";
                Id=req_data.book_id;
                params.sql = `insert into bookpicture(bid,bookpic) values(?,?)`;
                params.data = [req_data.book_id,req_data.file_id]; 
                break;
            case "delete":
                message="Book Picture Deleted Successfull";
                Id=req_data.book_id;
                params.sql = `delete from bookpicture where bid=?`;
                params.data = [req_data.book_id];
                break;
            case "deletebyfile":
                message="Book Picture Deleted Successfull";
                Id=req_data.file_id;
                params.sql = `delete from bookpicture where bookpic=?`;
                params.data = [req_data.file_id];
                break;
            case "update":
                message="Book Picture Updated Successfull";
                Id=req_data.book_id;
                params.sql = `update bookpicture set bookpic=? where bid=?`;
                params.data = [req_data.file_id,req_data.book_id];
                break;
            case "fetch":
                message="Book Picture fetched Successfull";
                params.option='fetchdata';
                params.sql = `select * from bookpicture where bid=?`;
                params.data = [req_data.book_id];
                break;
            case "fetchbyfile":
                params.option='fetchdata';
                message="Book Picture fetched Successfull";
                params.sql = `select * from bookpicture where bookpic=?`;
                params.data = [req_data.file_id];
                break;
            default: params.sql = `select * from bookpicture`;
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





module.exports = { Book_Filter, Book_Operations, Bookpic_Operations}