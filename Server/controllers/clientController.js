class ClientController {
    static async me(req,res){
        let secondMessage = 
            req.user.verified ? 
                "You are verified" : 
                "you should verify your account"

        return res.status(200).json(`Bonjour ${req.user.full_name} , votre rôle est : Client, ${secondMessage}`)
    }
}

module.exports = ClientController;