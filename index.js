const express = require('express')
const cors = require('cors');
const { createConnection } = require('./db/database');
// const cookieParser=require('cookie-parser');
const {readdirSync} = require('fs')
const cookieParser = require('cookie-parser');


const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.set("trust proxy", 1);
app.use(cors({
    origin:  ["http://localhost:5173","https://pettycash-managing-app.netlify.app"],  
    credentials: true
}));
app.use(cookieParser())


// app.get("/",async(req,res)=>
// {
//     res.send("hello,this is endpoint for pettycash")
// })
//routes
readdirSync('./routes').map((route) => app.use('/api/manager', require('./routes/' + route)))

const server =async () => {
    await createConnection()
     app.listen(PORT, () => {
        console.log('listening to port');
    })
}

server()