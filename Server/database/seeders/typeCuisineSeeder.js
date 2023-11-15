const TypeCuisine = require("../../models/TypeCuisine");

async function insertTypesCuisines() {
  const typesToInsert = [
    { name: "Arab" },
    { name: "Indian" },
    { name: "Italian" },
    { name: "French" },
    { name: "Chinese" },
    { name: "Mexican" },
    { name: "Japanese" },
    { name: "Thai" },
    { name: "Greek" },
    { name: "Spanish" },
    { name: "Korean" },
    { name: "Vietnamese" },
    { name: "Moroccan" },
    { name: "Lebanese" },
    { name: "Turkish" },
  ];

  try {
    const types = [];
    for (const type of typesToInsert) {
      const newType = await TypeCuisine.findOneAndUpdate({ name: type.name }, type, {
        upsert: true,
        new: true,
      });
      types.push(newType);
    }
    console.log("cuisinesTypes inserted successfully");
    return types;
  } catch (error) {
    console.error("Error inserting types:", error);
  }
}

module.exports = insertTypesCuisines;
