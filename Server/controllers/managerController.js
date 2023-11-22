const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


class ManagerController {
    static async me(req,res){
        let secondMessage = 
                req.user.verified ? 
                        "You are verified" : 
                        "you should verify your account"

        return res.status(200).json(`Bonjour ${req.user.full_name} , votre rôle est : Manager, ${secondMessage}`)
    }


    static async comfirmOrder(req,res){

        // Émettre une notification via WebSocket
        io.emit('nouvelle-commande', { message: 'You have new command!' });

        res.json({ success: true, message: 'You have new Command' });


    }
}

module.exports = ManagerController;