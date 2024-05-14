export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:mongo@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.PORT || '5050'
}