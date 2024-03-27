const mongoose = require('mongoose');
require('dotenv').config()


const MONGO_URL=process.env.URL


const createConnection=async ()=>
{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("MongoDB Connected")
    }
    catch(err){
        console.log(err)
    }
}

module.exports ={createConnection}