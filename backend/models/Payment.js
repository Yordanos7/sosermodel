const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    paymentDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    transactionId: { type: DataTypes.STRING(100), allowNull: true },
    screenshot: { type: DataTypes.STRING(255), allowNull: false },
    paymentMethod: { type: DataTypes.STRING(50), allowNull: true },
    transactionLink: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "payments", // Explicitly set table name to match database
    timestamps: true,
  }
);

module.exports = Payment;
