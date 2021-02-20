require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'maymaymay',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/beatfilmdb',
  PORT: process.env.PORT || 3000,
};
