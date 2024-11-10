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
 
const redisPublisher = redisClient.duplicate();
(async () => {
  await redisPublisher
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
})();
 
module.exports = { redisClient, redisPublisher };