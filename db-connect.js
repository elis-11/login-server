const mongoose = require("mongoose");

const connectDb = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connection successful!");
  } 
  catch (err) {
    console.log("Connection failed!", err.message);
  }
};

module.exports = { connectDb };
