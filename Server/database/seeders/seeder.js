require('../../config/dbConfig')();
(async function(){
    const roles = await require('./roleSeeder')();
    const types = await require("./typeCuisineSeeder")();
    const users = await require("./userSeeder")(roles);
    const restaurants = await require("./restaurantSeeder")(users,types);
    const menus = await require("./menuSeeder")(restaurants);
    const articles = await require("./articleSeeder")(menus);
    const commands = await require("./commandSeeder")(users,articles);
    return;
})();
