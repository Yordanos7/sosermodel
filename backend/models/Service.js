const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Service = sequelize.define(
  "Service",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING(50), allowNull: true }, // e.g. 'digital', 'insurance', 'loan', 'savings'
    features: { type: DataTypes.TEXT, allowNull: true }, // JSON string or comma-separated
    interestRate: { type: DataTypes.STRING(20), allowNull: true },
    premium: { type: DataTypes.STRING(20), allowNull: true },
    coverage: { type: DataTypes.STRING(50), allowNull: true },
    minBalance: { type: DataTypes.STRING(20), allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true }, // JSON string or comma-separated
  },
  { timestamps: true }
);

module.exports = Service;
