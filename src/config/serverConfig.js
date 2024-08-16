const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  REMINDER_BINDNIG_KEY: process.env.REMINDER_BINDNIG_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
