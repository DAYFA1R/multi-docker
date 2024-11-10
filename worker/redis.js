const { createClient } = require('redis');
const keys = require('./keys');
 
const redisOptions = {
  socket: {
    reconnectStrategy: () => 1000,
    host: keys.redisHost,
    port: keys.redisPort
  }
};
 
const redisClient = createClient(redisOptions);
(async () => {
  await redisClient
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
})();
 
const redisSubscriber = redisClient.duplicate();
(async () => {
  await redisSubscriber
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
})();
 
module.exports = { redisClient, redisSubscriber };