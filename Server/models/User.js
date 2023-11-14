const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    full_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
        unique : true,
        required : true
    },
    image_url : {
        type : String,
    },
    address : {
        type : String,
    },
    verified : {
        type : Boolean,
        default : false ,
    },
    approved : {
        type : Boolean,
        default : false ,
    },
    role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Role'
    },

})

userSchema.methods.hashPassword = async function (){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
}

userSchema.pre('save', async function() {
    await this.hashPassword();
});

const User = mongoose.model('User',userSchema)
module.exports = User