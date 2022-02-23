const express = require('express');
const app=express();
const port="1111";
const hostname="localhost";
const path=require('path');
require('dotenv').config({
    path:path.join(__dirname,'.env')
})
app.use=('/routes'),require('./routes/routes')

require('./config/db')

app.listen(port,hostname,()=>{
    console.log(`server is running on http://${hostname}:${port}`);
    
})