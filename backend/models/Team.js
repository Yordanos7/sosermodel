const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "General Assembly",
        "Control Committee",
        "Executive Leadership",
        "Division Leadership",
        "Branch Network",
        "Our Dedicated Staff",
        "Our Team Members"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "teams",
    timestamps: true,
  }
);

module.exports = Team;
