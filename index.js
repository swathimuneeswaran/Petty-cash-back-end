const express = require('express');
const path = require('path');
const transactRoutes = require("./routes/transactions.js");
const { createConnection } = require('./db/database.js');
const cookieParser = require('cookie-parser');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

// const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/manager", transactRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const server = async () => {
    await createConnection();
    app.listen(PORT, () => {
        console.log('listening to port');
    });  
};

server();
