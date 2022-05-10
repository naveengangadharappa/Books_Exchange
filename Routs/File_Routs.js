const express = require('express');
const router = express.Router();
const validationschema = require('../Validations/Validations');
const handleError= require('../Errors/errors');
const multer = require('multer');
const path = require('path');   

let storage = multer.diskStorage({
    destination:'assets/',
    filename: function (req, file, cb) { 
        fname=file.fieldname + '-' + Date.now()+ '.jpg'
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: storage,
});
 
const upload1 = multer({
    storage: storage,
}).single('file');

const arrUpload = upload.array('file', 10); //limit uploading upto 10 files at one shot

router.get('/', (req, res) => {
    try{
        //req.split(023);
        res.json({ message: "Connected to Node Api server for Books Exchange. " })
    }catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
    //res.send( "A - Connected to Node Api server for Books Exchange. ".repeat(1000))
})

router.get('/get_file/:filename',(req,res)=>{
    try{
        console.log("file name params = ",req.params.filename)
        if(req.params.filename) 
            res.download(path.join('./assets',req.params.filename),req.params.filename);
        else res.json({status:false,Message:'Invalid File Name'});
    }catch(err){ 
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
})

router.post('/get_file',(req,res)=>{
    try{
        console.log("post get file entered");
        if(req.body.filename)
            res.download(path.join('./assets',req.body.filename),req.body.filename);
        else res.json({status:false,Message:'Invalid File Name'});
    }catch(err){ 
        console.log("Post get_file = ",err);
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }  
})

router.post('/upload_file',upload1,(req,res)=>{
    try{
        if(req.file)
            res.json({status:true,file_details:req.file,Message:"File upload Successfull"});
        else 
            res.json({status:false,Message:"File upload  Unsuccessfull"});
    }catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
   
})

router.post('/upload_files',arrUpload,(req,res)=>{
    try{
        if(req.files.length>0)
            res.json({status:true,file_details:req.files,Message:"Files upload Successfull"})
        else
            res.json({status:false,Message:"Files not upload plz try again"})
    } catch(err){
        handleError(res,err,err.message, 500,'./Logs/Routs_Error_Logs.json');
    }
})

router.use(validationschema.handle_ValidationError)

module.exports = router;