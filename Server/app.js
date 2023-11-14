const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");

const app = express()
require('dotenv').config()
require('./config/dbConfig')();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user/client', require('./routes/ClientRoutes'));
app.use('/api/user/DeliveryMan', require('./routes/DeliveryManRoutes'));
app.use('/api/user/Manager', require('./routes/ManagerRoutes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`listening to ${PORT}`);
})