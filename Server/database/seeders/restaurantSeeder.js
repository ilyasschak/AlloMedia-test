const Restaurant = require("../../models/Restaurant");
const { faker } = require("@faker-js/faker");

async function insertRestaurant(users,types) {
  const restaurantToInsert = [];
  for (let i = 1; i <= 10; i++) {
    const nom = faker.company.name();
    const emplacement = faker.address.street();
    restaurantToInsert.push({
      nom,
      emplacement,
      typeCuisine: types[Math.floor(Math.random() * types.length)]._id,
      owner: users[Math.floor(Math.random() * users.length)]._id,
    });
  }
  try {
    const restaurants = await Restaurant.insertMany(restaurantToInsert);
    console.log("Restaurants inserted successfully");
    return restaurants;
  } catch (error) {
    console.error("Error inserting Restaurants:", error);
  }
}

module.exports = insertRestaurant;
