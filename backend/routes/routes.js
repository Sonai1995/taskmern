const express= require('express');
const router=express.Router();
const userCtrl=require('../controllers/userController')
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
var jwt=require('jsonwebtoken');

var jwtAuth=(req,resp,next)=>{
    var token=req.headers.authorization;
    token=token.split(' ')[1];
    jwt.verify(token,process.env.secrectkey,function(err,decoded){
        if(err){
            response.send({mesage:'Invalid Token'})
        }else{
            next();
        }
    })
}
router.get('/',(req,res)=>{
    res.send("successfull")
})
router.get('/list',jwtAuth,userCtrl.userList)
router.post('/add',userCtrl.userAdd)
router.post('/login',userCtrl.userLogin)

module.exports=router;