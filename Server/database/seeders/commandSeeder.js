const Command = require("../../models/Command");
const { faker } = require("@faker-js/faker");

async function insertCommands(users, articles) {
  const commandsToInsert = [];
  const theEnum = ['Pending', 'Confirmed', 'InDelivery', 'Delivered'];
  for (let i = 1; i <= 20; i++) {
    const status = theEnum[Math.floor(Math.random() * theEnum.length)];
    commandsToInsert.push({
      client: users[Math.floor(Math.random() * users.length)]._id,
      livreur: users[Math.floor(Math.random() * users.length)]._id,
      articles: [
        {
          id: articles[Math.floor(Math.random() * articles.length)]._id,
          quantite: Math.floor(Math.random() * 10) + 1,
        },
        {
          id: articles[Math.floor(Math.random() * articles.length)]._id,
          quantite: Math.floor(Math.random() * 10) + 1,
        },
      ],
      status
    });
  }
  try {
    // const commands = await Command.insertMany(commandsToInsert);
    const commands = await Command.create(commandsToInsert);
    console.log("commands inserted successfully");
    return commands;
  } catch (error) {
    console.error("Error inserting commands:", error);
  }
}

module.exports = insertCommands;
