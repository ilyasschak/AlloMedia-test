const Role = require('../models/Role');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AuthController = require('./AuthController');
const { emailVerificationMessage } = require('../utils/messagesGenerator');
const { sendEMail } = require('../utils/emailSender');

class UserController {
    static async register(req,res){
        let { 
            email,
            full_name,
            password,
            password_confirmation,
            phone_number,
            address,
            role 
        } = req.body;
console.log(email, full_name, phone_number, password);
        if(!email , !full_name, !password ,!phone_number, !role,!password_confirmation){
            
            return res.status(400).json({message: 'All fields are required'})
        }
        
        if(password != password_confirmation){
            return res.status(400).json({message: 'Passwords do not match'})
        }

        if(role != "DeliveryMan" && role != "Client"){
            return res.status(400).json({message: 'Invalid Role'})
        }

        const selectedRole = await Role.findOne({ name: role });
        if (!selectedRole) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        let existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message: 'Email already token'})
        }

        existingUser = await User.findOne({phone_number})
        if(existingUser){
            return res.status(409).json({message: 'Phone Number already in use'})
        }

        let user = new User({ 
            email,
            full_name,
            password,
            phone_number,
            address,
            role : selectedRole._id
        })

        try{

            await user.save()
            sendEMail(emailVerificationMessage(user.email, "Email Verification"))
            
        }catch(err){
            console.log(err);
        }
        
        res.status(201).json({message: `User has been added`,user})
    }
}
module.exports = UserController;