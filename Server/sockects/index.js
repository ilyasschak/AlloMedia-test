function socketHandler(socket){
    console.log(`coonected with : ${socket.id}`);
    socket.on('nouvelle-commande', (data)=>{
        console.log(data);
        socket.broadcast.emit("recieved notification", data)
    })
}

module.exports = socketHandler;