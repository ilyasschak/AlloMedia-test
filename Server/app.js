
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");
const socketHandler = require('./sockects')
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');

const server = http.createServer(app);


app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173",
    }
})

// io.on("connection", (socket)=>{

//     console.log(`coonected with : ${socket.id}`);
//     socket.on('nouvelle-commande', (data)=>{
//         console.log(data);
//         socket.broadcast.emit("recieved notification", data)
//     })

// })
io.on("connection", socketHandler)


require('dotenv').config()
require('./config/dbConfig')();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', require('./routes/restaurantRoutes'))
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user/client', require('./routes/ClientRoutes'));
app.use('/api/user/DeliveryMan', require('./routes/DeliveryManRoutes'));
app.use('/api/user/Manager', require('./routes/ManagerRoutes'));
app.use('/api/menu', require('./routes/MenuRoutes'));
app.use('/api/menu', require('./routes/PlatRoutes'));
app.use('/api/panier', require('./routes/PanierRoutes'));
app.use('/api/cart', require('./routes/PanierRoutes'));
app.use('/api/cart', require('./routes/PanierRoutes'))
app.use('/api/cart', require('./routes/PanierRoutes'))
app.use('/api/', require('./routes/PanierRoutes'))
app.use('/api/orders', require('./routes/OrderRoutes'));



// Gérer la connexion WebSocket
// io.on('connection', (socket) => {
//     console.log('Nouvelle connexion WebSocket');
  
//     // Gérer la déconnexion WebSocket
//     // socket.on('disconnect', () => {
//     //   console.log('Déconnexion WebSocket');
//     // });
//   });

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`listening to ${PORT}`);
})