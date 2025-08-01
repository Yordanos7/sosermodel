require("dotenv").config();
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const sequelize = require("./config/db");

const addAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    const adminData = {
      name: "Admin",
      email: "soserunion@gmail.com",
      password: "@Afrine@2025",
      role: "admin",
      phone: "+251582211539",
      address: "dangila",
    };

    const existingAdmin = await User.findOne({
      where: { email: adminData.email },
    });
    if (existingAdmin) {
      console.log("Admin user with this email already exists.");
      return;
    }

    await User.create(adminData);
    console.log("Admin user created successfully.");
  } catch (error) {
    console.error(
      "Unable to connect to the database or create admin user:",
      error
    );
  } finally {
    await sequelize.close();
  }
};

addAdmin();
