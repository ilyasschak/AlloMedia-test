const Menu = require("../../models/Menu");
const { faker } = require("@faker-js/faker");

async function insertMenus(restaurants) {
  const menuToInsert = [];
  for (let i = 1; i <= 20; i++) {
    const nom = faker.commerce.productName();

    menuToInsert.push({
      nom,
      restaurant: restaurants[Math.floor(Math.random() * restaurants.length)]._id,
    });
  }
  try {
    const menu = await Menu.insertMany(menuToInsert);
    console.log("Menus inserted successfully");
    return menu;
  } catch (error) {
    console.error("Error inserting menus:", error);
  }
}

module.exports = insertMenus;
