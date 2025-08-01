const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "soseruwv_soserapp",
  "soseruwv_usersoser",
  "rFU^k.p_5@Bf5n=k",
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306, // Explicitly specify MySQL port
    logging: console.log, // Enable logging for debugging
    dialectOptions: {
      connectTimeout: 30000, // 30 seconds timeout
    },
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNREFUSED/,
        /ECONNRESET/,
        /EPIPE/,
      ],
      max: 5, // Retry up to 5 times
      timeout: 10000, // Wait 10 seconds between retries
    },
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
