const express = require('express')
const cors = require('cors');
const { createConnection } = require('./db/database');
const cookieParser=require('cookie-parser');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors({
    origin: function(origin, callback) {
        // Check if the request origin is allowed
        const allowedOrigins = ["http://localhost:5173","https://pettycash-managing-app.netlify.app"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));
app.use(cookieParser())


app.get("/",async(req,res)=>
{
    res.send("hello,this is endpoint for pettycash")
})
//routes
readdirSync('./routes').map((route) => app.use('/api/manager', require('./routes/' + route)))

const server =async () => {
    await createConnection()
     app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()