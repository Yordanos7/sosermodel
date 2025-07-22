const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM("faq", "office"), allowNull: false },
    // FAQ fields
    question: { type: DataTypes.STRING(255), allowNull: true },
    answer: { type: DataTypes.TEXT, allowNull: true },
    // Office fields
    name: { type: DataTypes.STRING(100), allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    region: { type: DataTypes.STRING(100), allowNull: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
    phone: { type: DataTypes.STRING(30), allowNull: true },
    email: { type: DataTypes.STRING(100), allowNull: true },
    hours: { type: DataTypes.STRING(255), allowNull: true }, // JSON string or text
    services: { type: DataTypes.TEXT, allowNull: true }, // JSON string or comma-separated
    manager: { type: DataTypes.STRING(100), allowNull: true },
    staff: { type: DataTypes.INTEGER, allowNull: true },
    established: { type: DataTypes.STRING(10), allowNull: true },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    coordinates: { type: DataTypes.STRING(100), allowNull: true }, // JSON string or lat,lng
  },
  { timestamps: true }
);

module.exports = Contact;
