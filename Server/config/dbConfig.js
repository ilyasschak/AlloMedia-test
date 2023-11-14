const mongoose = require("mongoose");
const Role = require("../models/Role");
const User = require("../models/User");
require('dotenv').config()

module.exports = () =>{
      mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      const db = mongoose.connection;
      
      db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      
      db.once('open', async () => {
        console.log('Connected to MongoDB');
        seedRoles();
        let user = await seedDefaultManager();
        if(user) console.log("user inserted");
        assignManagerRole(user);
      });
}


async function seedRoles(){
    let alreadyExist = await checkCollectionOrDocumentsExist('roles');
    if(!alreadyExist){
      const roles = process.env.DEFAULT_ROLES.split(',')
      roles.forEach(role=>{
        try {
          role = new Role({ name : role });
          role.save();
          console.log(`${role.name} inserted`);
        } catch (error) {
          console.log(error);
        }
        
      })
    }
}


async function seedDefaultManager(){
  let alreadyExist = await checkCollectionOrDocumentsExist('users');
  if(!alreadyExist){
    let user = new User({
      full_name : process.env.DEFAULT_MANAGER_FULLNAME,
      email : process.env.DEFAULT_MANAGER_EMAIL,
      password : process.env.DEFAULT_MANAGER_PASSWORD,
      phone_number : process.env.DEFAULT_MANAGER_PHONE_NUMBER,
      verified : true,
      approved : true,
    })
    return await user.save()
  }
}


async function assignManagerRole(user){
  if(user){
    let role = process.env.DEFAULT_ROLES.split(',')[0]
    role = await Role.findOne({name: role })
    user.role = role._id 
    user.password = process.env.DEFAULT_MANAGER_PASSWORD
    await user.save()
    console.log(`role ${role.name} assigned`);
  }
}

async function checkCollectionOrDocumentsExist(name){
    let exist = true;
    const rolesCollectionExists = await mongoose.connection.db.listCollections({ name }).hasNext();
    if (rolesCollectionExists) {
      const rolesCount = await mongoose.connection.db.collection(name).countDocuments();
      exist = rolesCount ? true : false
    }else{
      exist =  false
    }
    return exist
}
