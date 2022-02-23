const mongoose=require('mongoose')
const conn=require('../config/db')
var bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var userSchema=new mongoose.Schema({
    
    name:String,
    mobile:String,
    email:String,
    password:{
        type:String,
        select:true,

    },
tokens:[
    {
        token:{
            type:String,
            require:true
        }
    }
]
},{
    timestamps:true
})
userSchema.pre('save',function(next){
var salt=bcrypt.genSaltSync(10);
if(this.password && this.isModified('password')){
    this.password=bcrypt.hashSync(this.password,salt);
}

next();
})
userSchema.methods.getAuthToken=async function(data){
    let params={
        id:this._id,
        mobile:this.mobile,
        email:this.email
        
    }
    var tokenValue=jwt.sign(params,process.env.secrectkey,{expiresIn:'300000s'});
this.tokens=this.tokens.concat({token:tokenValue})
await this.save();
return tokenValue;
}
let users=conn.model('users',userSchema,'user')
module.exports=users;
