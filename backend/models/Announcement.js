const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Announcement = sequelize.define(
  "Announcement",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100), allowNull: false },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "urgent"),
      defaultValue: "medium",
    },
    publishDate: { type: DataTypes.DATE, allowNull: true },
    expiryDate: { type: DataTypes.DATE, allowNull: true },
    targetAudience: { type: DataTypes.STRING(50), defaultValue: "all" },
    tags: { type: DataTypes.STRING(255), allowNull: true },
    attachments: { type: DataTypes.TEXT, allowNull: true }, // JSON string or comma-separated
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "users", key: "id" },
    },
  },
  { timestamps: true, tableName: "Announcements" }
);

module.exports = Announcement;
