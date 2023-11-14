class DeliveryManController {
    static async me(req,res){
        let secondMessage = 
                req.user.verified ? 
                        "You are verified" : 
                        "you should verify your account"

        secondMessage += 
                req.user.approved ?
                    "\nyour role is approved by the manager" : 
                    "\nyou are waiting to be approved as a delivery man"

        return res.status(200).json(`Bonjour ${req.user.full_name} , votre rôle est : DeliveryMan, ${secondMessage}`)
    }
}

module.exports = DeliveryManController;