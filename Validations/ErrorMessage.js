const Auth = {
    login:{
        "required.email": 'Employee Email Required',
        "required.id": 'Employee Id Required',
        "required.password": 'Password Required',
        "email.email":'Invalid Email Plz verifiy and try again'
    },
    register:{
        "required.id": 'id(student roll) number required',
        "required.stu_name": 'Student Name Required',
        "required.stu_branch": 'Student Branch Required',
        "required.stu_sem": 'Student Sem Required',
        "required.stu_email": 'Student Email Required',
        "required.stu_phone": 'Student Phone No Required',
        "required.stu_clg": 'Student Collage Required',
        "required.stu_password": 'Student Password Required',
    },
    passwordreset:{

    },
    logout:{

    }
};

const Notification = {
    sms:{
      
    },
    email:{

    },
    firebase:{

    },
    desktop:{

    }
};

const Book_Operations = {
    add:{
       
    },
    delete:{

    },
    update:{

    },
    fetch:{

    }
};

const feedback = {
    add:{
        
    },
    delete:{

    },
    update:{

    },
    fetch:{

    }
};

const Order_Operations = {
    add:{
    
    },
    delete:{

    },
    update:{

    },
    fetch:{

    }
};

const Seller_filter = {
    id:{
        
    },
    name:{

    },
    bookid:{

    },
    booktitle:{

    },
    university:{

    },
    collage:{

    },
    branch:{

    },
    sem:{
        
    },
    author:{

    }    
};

const book_filter = {
    id:{
        email: 'required|email',
        password: 'required|min:1000000000|max:999999999999999',
        rollno:'required|min:1000000000|max:999999999999999'
    },
    title:{

    },
    branch:{

    },
    sem:{

    },
    university:{

    },
    collage:{

    },
    sector:{
        
    },
    author:{

    }    
};

module.exports = {Auth,book_filter,Notification,Book_Operations,Order_Operations,Seller_filter,feedback }
