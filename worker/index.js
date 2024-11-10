const { redisClient, redisSubscriber } = require('./redis');

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

redisSubscriber.subscribe('insert', (message) => {
  redisClient.hSet('values', message, fib(parseInt(message)));
})