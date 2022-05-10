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
                params.sql = `select * from book where b_id=?`;
                params.data = [req_data.book_id];
                break;
            case "title":
                params.sql = `select * from book where b_name like '%${req_data.book_name}%'`;
                params.data = [req_data.book_name];
                break;
            case "author":
                    params.sql = `select * from book where b_author like '%${req_data.book_author}%'`;
                    params.data = [req_data.book_author];
                    break;
            case "sector":
                params.sql = `select * from book where b_section=?`;
                params.data = [req_data.book_section];
                break;
            case "branch":
                params.sql = `select * from book where b_branch=?`;
                params.data = [req_data.book_branch];
                break;
            case "sem":
                params.sql = `select * from book where b_sem=?`;
                params.data = [req_data.book_sem];
                break;
            case "edition":
                params.sql = `select * from book where b_edition like '%${req_data.book_edition}%'`;
                params.data = [req_data.book_edition];
                break;
            case "university":
                params.sql = `select * from book where b_university like '%${req_data.book_university}%'`;
                params.data = [req_data.book_university];
                break;
            default: params.sql = `select * from book`;
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
        switch (filter) {
            case "add":
                let book_id=await helpers.generate_id()
                params.sql = `insert into book(b_id,b_name,b_author,b_edition,b_branch,b_sem,b_section,b_university) values(?,?,?,?,?,?,?,?)`;
                params.data = [book_id,req_data.book_name,req_data.book_author,req_data.book_edition,req_data.book_branch,req_data.book_sem,req_data.book_section,req_data.book_university]; 
                break;
            case "delete":
                params.sql = `delete from book where b_id=?`;
                params.data = [req_data.book_id];
                break;
            case "update":
                params.sql = `update book set b_name=?,b_author=?,b_edition=?,b_branch=?,b_sem=?,b_section=?,b_university=? where b_id=?`;
                params.data = [req_data.book_name,req_data.book_author,req_data.book_edition,req_data.book_branch,req_data.book_sem,req_data.book_section,req_data.book_university,req_data.book_id];
                break;
            default: params.sql = `select * from book`;
        }
        Result_data = await mysqloperations(params);
        return Result_data;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/DB_Error_Logs.json');
    }
}





module.exports = { Book_Filter, Book_Operations}