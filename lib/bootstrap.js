const mongoose = require('mongoose');

let isSetup;

module.exports = initialize = async () => {
  if (isSetup) {
    return;
  }

  const database = await mongoose.connect(process.env.MONGO);
  if (!database.connections[0].readyState) {
    throw new Error('Error connecting to MongoDB');
  }
  isSetup = true;
}