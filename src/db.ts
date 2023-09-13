const dotenv = require("dotenv");
export const mongoose = require("mongoose");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connect = async () => {
  try {
    const dataBase = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = dataBase.connection;
    console.log(`✅ DDBB connected ✅ In host: ${host} with name: ${name}`);
  } catch (error) {
    console.log("❌FAIL connecting DDBB❌");
    console.log(error);
  }
};

module.exports = { connect };
