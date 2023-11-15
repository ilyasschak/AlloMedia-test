const User = require("../../models/User");
const { faker } = require("@faker-js/faker");

async function insertUsers(roles) {
  const usersToInsert = [
  ];
  for(let i = 1 ; i <= 10 ; i++){
    const full_name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const phone_number = faker.phone.number();
    const address = faker.address.streetAddress();

    usersToInsert.push({
      full_name,
      email,
      password,
      phone_number,
      address,
      verified: true,
      approved: true,
      role: roles[Math.floor(Math.random() * roles.length)]._id,
    });
  }
  try {
    const users = await User.insertMany(usersToInsert);
    console.log("Users inserted successfully");
    return users;
  } catch (error) {
    console.error("Error inserting users:", error);
  }
}

module.exports = insertUsers;
