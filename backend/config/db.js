const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:${process.env.db_port}/${process.env.database}`

)
.then(con=>{
    console.log('connected DB')
}).catch(err=>{
    console.log('error',err)
})
module.exports=mongoose;
