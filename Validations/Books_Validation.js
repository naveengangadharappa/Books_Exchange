const Validator = require('validatorjs');
const errmsg = require('./ErrorMessage');
const handleError= require('../Errors/errors');

const Book_Operations = {
    add:{
        //book_id: 'required',required|alpha'
        book_name: 'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_author:'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_branch: 'required|alpha|between:2,100',
        book_edition: 'required|numeric|digits_between:1,100',
        book_sem: 'required|numeric|digits_between:0,1',
        book_section:'required|alpha|between:2,100',
        book_university:'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_price: 'required|numeric|digits_between:0,5',
        stu_id:'required|alpha_num|between:9,12',
    },
    delete:{
        book_id: 'required|between:2,100',
        book_name: 'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_author:'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_branch: 'alpha|between:2,100',
        book_sem: 'numeric|digits_between:0,1',
        book_section:'alpha|between:2,100',
        book_university:'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        stu_id:'required|alpha_num|between:9,12',
    },
    update:{
        book_id: 'required|between:2,100',
        book_name: 'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_author:'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_branch: 'required|alpha|between:2,100',
        book_edition: 'required|numeric|digits_between:1,100',
        book_sem: 'required|numeric|digits_between:0,1',
        book_section:'required|alpha|between:2,100',
        book_university:'required|regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_price: 'required|numeric|digits_between:0,5',
        stu_id:'required|alpha_num|between:9,12',
    },
    fetch:{
        book_id: 'between:2,100',
        book_name: 'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_author:'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
        book_branch: 'alpha|between:2,100',
        book_sem: 'numeric|digits:2',
        book_section:'alpha|between:2,100',
        book_university:'regex:/^[a-z0-9 ]+$/i|between:2,100',//alpha_dash|
    }
};

const Bookpic_Operations = {
    add:{
        book_id: 'required|numeric|digits_between:0,100',
        file_id: 'required|between:0,100',
    },
    delete:{
        book_id: 'required|numeric|digits_between:0,100',
    },
    deletebyfile:{
        file_id: 'required|between:0,100',
    },
    update:{
        book_id: 'required|numeric|digits_between:0,100',
        file_id: 'required|between:0,100',
    },
    fetch:{
        file_id: 'required|between:0,100',
    },
    fetchbyfile:{
        file_id: 'required|between:0,100',
    }
};

const book_filter = {
    book_id:{
        book_id: 'required',
    },
    book_name:{
        book_name: 'required|alpha_dash|between:2,100',
    },
    book_branch:{
        book_branch: 'required|alpha|between:2,100',
    },
    book_sem:{
        book_sem: 'required|numeric|digits_between:1,2',
    },
    book_university:{
        book_university:'required|alpha_dash|between:2,100',
    },
    book_author:{
        book_author:'required|alpha_dash|between:2,100',
    },
    book_edition:{
        book_edition:'required|alpha_dash|digits_between:1,2',
    },
    book_sector:{
        book_section:'required|alpha|between:2,100',
    },
    stu_id :{
        stu_id:'required|alpha_num|between:9,12',
    }  
};

const all_validation = {
    Book_Operations,
    book_filter,
    Bookpic_Operations
}

const validatedata = async (body, option,res) => {
    try {
        let validation;
        let validation_result = { status: false, message: "option cannot be identified" };
        //console.log("body : ", (body));
        switch (option) {
            case 'book_operations':
                switch(body.choice){
                    case 'add':
                        validation = new Validator(body, Book_Operations.add, errmsg.Book_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'delete':
                        validation = new Validator(body, Book_Operations.delete, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Book_Operations.update, errmsg.Book_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Book_Operations.fetch, errmsg.Book_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
                break;
            case 'book_filter':
                switch(body.choice){
                    case 'all':validation_result = {status:true};
                        break;
                    case 'title':
                        validation = new Validator(body, book_filter.book_name, errmsg.book_filter.title)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'id':
                        validation = new Validator(body, book_filter.book_id, errmsg.book_filter.id)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'sector':
                        validation = new Validator(body, book_filter.book_sector, errmsg.book_filter.sector)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'branch':
                        validation = new Validator(body, book_filter.book_branch, errmsg.book_filter.branch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'university':
                        validation = new Validator(body, book_filter.book_university, errmsg.book_filter.university)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'sem':
                        validation = new Validator(body, book_filter.book_sem, errmsg.book_filter.sem)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'edition':
                        validation = new Validator(body, book_filter.book_edition, errmsg.book_filter.collage)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'author':
                        validation = new Validator(body, book_filter.book_author, errmsg.book_filter.author)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result = {status:true};//validation_result ={status:false,message:"Invalid choice passed,please pass valid choice"};
                        break;
                }
                break;
            case 'Bookpic_Operations':console.log(`${option} - ${body.choice}`)
                switch(body.choice){
                    case 'add':
                        console.log("entered add")
                        validation = new Validator(body, Bookpic_Operations.add, errmsg.Book_Operations.add)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        console.log("Validation result = ",validation_result);
                        break;
                    case 'delete':
                        validation = new Validator(body, Bookpic_Operations.delete, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'deletebyfile':
                        validation = new Validator(body, Bookpic_Operations.deletebyfile, errmsg.Book_Operations.delete)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'update':
                        validation = new Validator(body, Bookpic_Operations.update, errmsg.Book_Operations.update)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetch':
                        validation = new Validator(body, Bookpic_Operations.fetch, errmsg.Book_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    case 'fetchbyfile':
                        validation = new Validator(body, Bookpic_Operations.fetchbyfile, errmsg.Book_Operations.fetch)
                        validation_result = validation.fails() ? { status: false, message: 'Validation Unsuccessfull', validation: validation.errors.errors } : { status: true };
                        break;
                    default : validation_result ={status:false,message:"Invalid choice passed,please pass valid choice "};
                    break;
                }
                break;
            default: validation_result = { status: false, message: "option cannot be identified" };
           
        }
        return validation_result;
    } catch (err) {
        console.log(err);
        handleError(res,err,err.message, 500,'./Logs/Validation_Error_Logs.json');
        // error_result = await Log_Controllers.LogError('myId', err, './Logs/Validation_Error_Logs.json', Validation_error, 'json')
        // return { status: false, message: "Internal Server Error Please try Again" };
    }
}
 
module.exports = { validatedata,all_validation }
//module.exports = { validatedata, handle_ValidationError }








