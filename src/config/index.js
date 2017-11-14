// src/config/index.js

const myMongoUrl = process.env.MONGO_URL;

module.exports = {
  appName: 'Comic Collection',
  port: 80,
  mongo_url: `mongodb://${myMongoUrl}`
}