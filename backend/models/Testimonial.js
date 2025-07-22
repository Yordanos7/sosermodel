const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Testimonial = sequelize.define(
  "Testimonial",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loanAmount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    impact: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Testimonial;
