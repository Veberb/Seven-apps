const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.MONGODB_URI, {
  autoIndex: true,
  useNewUrlParser: true,
});

connection
  .then(() => {
    console.log('connectado');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connection;
