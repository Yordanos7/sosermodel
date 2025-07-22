const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define(
  "Event",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    eventType: { type: DataTypes.STRING(50), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: true },
    endTime: { type: DataTypes.TIME, allowNull: true },
    location: { type: DataTypes.STRING(150), allowNull: true },
    capacity: { type: DataTypes.INTEGER, allowNull: true },
    registrationRequired: { type: DataTypes.BOOLEAN, defaultValue: true },
    registrationDeadline: { type: DataTypes.DATEONLY, allowNull: true },
    cost: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    organizer: { type: DataTypes.STRING(100), allowNull: true },
    contactEmail: { type: DataTypes.STRING(100), allowNull: true },
    contactPhone: { type: DataTypes.STRING(30), allowNull: true },
    tags: { type: DataTypes.STRING(255), allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

module.exports = Event;
