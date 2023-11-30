function socketHandler(socket){
    console.log(`coonected with : ${socket.id}`);
    socket.on('nouvelle-commande', (data)=>{
        console.log(data);
        socket.broadcast.emit("recieved notification", data)
    })

    socket.on('recieved notification from delivery', (data)=>{
        console.log(data);
        socket.broadcast.emit("recieved notification from manager", data)
    })
}

module.exports = socketHandler;