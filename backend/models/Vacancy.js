const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vacancy = sequelize.define(
  "Vacancy",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    department: { type: DataTypes.STRING(100), allowNull: false },
    location: { type: DataTypes.STRING(100), allowNull: false },
    employmentType: {
      type: DataTypes.ENUM(
        "full-time",
        "part-time",
        "contract",
        "temporary",
        "internship",
        "other"
      ),
      allowNull: false,
    },
    experienceLevel: {
      type: DataTypes.ENUM(
        "entry-level",
        "mid-level",
        "senior-level",
        "executive"
      ),
      allowNull: false,
    },
    salaryMin: { type: DataTypes.INTEGER, allowNull: true },
    salaryMax: { type: DataTypes.INTEGER, allowNull: true },
    applicationDeadline: { type: DataTypes.DATEONLY, allowNull: false },
    jobDescription: { type: DataTypes.TEXT, allowNull: false },
    responsibilities: { type: DataTypes.TEXT, allowNull: true },
    requirements: { type: DataTypes.TEXT, allowNull: true },
    qualifications: { type: DataTypes.TEXT, allowNull: true },
    benefits: { type: DataTypes.TEXT, allowNull: true },
    contactEmail: { type: DataTypes.STRING(100), allowNull: true },
    contactPhone: { type: DataTypes.STRING(30), allowNull: true },
    hiringManager: { type: DataTypes.STRING(100), allowNull: true },
    urgent: { type: DataTypes.BOOLEAN, defaultValue: false },
    image: { type: DataTypes.STRING, allowNull: true },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { timestamps: true }
);

module.exports = Vacancy;
