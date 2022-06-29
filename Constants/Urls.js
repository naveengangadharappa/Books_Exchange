const common_validationschema = require('../Validations/Common_Validation');
const auth_validationschema = require('../Validations/Auth_Validation');
const order_validationschema = require('../Validations/Order_Validation');
const book_validationschema = require('../Validations/Books_Validation');

const Url= {
    Auth:{
       Login: '/Login',
       Signup:'/Signup',
       PasswordReset:'/PasswordReset',
       Logout:'/Logout',
       Get_login_status:'/Get_login_status',
       Address_operation:'/Address_operation',
       Profilepic_Operations:'/Profilepic_Operations',
       auth_validationschema:auth_validationschema,
    },
    Books:{
        Book_Operations:'/Bookpic_Operations',
        Book_Filter:'/Book_Filter',
        Bookpic_Operations:'/Bookpic_Operations',
        book_validationschema:book_validationschema,
    },
    Orders:{
        Order_Operations:'/Order_Operations',
        Order_Filter:'/Order_Filter',
        Seller_Filter:'/Seller_Filter',
        order_validationschema:order_validationschema,
    },
    File_Routs:{
        get_file_:'/get_file/:filename',
        get_file:'/get_file',
        upload_file:'/upload_file',
        upload_files:'/upload_files',
    },
    Common_Routs:{
        Notification:'/Notification',
        Submit_feedback: '/Submit_feedback',
        common_validationschema:common_validationschema,
    }
}

module.exports =  Url ;