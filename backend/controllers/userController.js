const user=require('../models/users');
var bcrypt=require('bcryptjs');
const userList=(req,resp)=>{
     user.find().then(res=>{resp.status(200).json({result:res})})
    
}
const userAdd=async (req,res)=>{
    let {name,mobile,email,password}=res.body;
    let data=new user({name,mobile,email,password});
    let response=await data.save();
    let myToken=await data.getAuthToken();
    res.status(200).json({message:'ok',token:myToken});
}
const userLogin=async (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(301).json({message:'Error',message:'Please select email/password'});
    }
    let user=await user.findOne({email:req.body.email});
    var responseType={
        message:'ok'
    }
    if(user){
    var match =await bcrypt.compare(req.body.password,user.password)
    console.log(match,req.body.password,user.password)

    if(match){
        let myToken=await user.getAuthToken();
        responseType.message='Login successfully'
        responseType.token=myToken
    }else{
        
        responseType.message='Invalid password'
    }

}else{
    responseType.message='Invalid Email ID'
}
    res.status(200).json({message:'ok',data:responseType});
}
module.exports={
userList,
userAdd,
userLogin
}