// index.js
const User = require("./User");
const Payment = require("./Payment");
const Announcement = require("./Announcement");
const Event = require("./Event");
const Gallery = require("./Gallery");
const Video = require("./Video");

const Vacancy = require("./Vacancy");
const Contact = require("./Contact");
const Service = require("./Service");
const Comment = require("./Comment");
const Team = require("./Team");
const Testimonial = require("./Testimonial");
const Document = require("./Document");

// Define associations
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "user" });

User.hasMany(Announcement, { foreignKey: "postedBy", as: "announcements" });
Announcement.belongsTo(User, { foreignKey: "postedBy", as: "user" });

User.hasMany(Event, { foreignKey: "createdBy", as: "events" });
Event.belongsTo(User, { foreignKey: "createdBy", as: "user" });

User.hasMany(Gallery, { foreignKey: "uploadedBy", as: "gallery" });
Gallery.belongsTo(User, { foreignKey: "uploadedBy", as: "user" });

User.hasMany(Video, { foreignKey: "uploadedBy", as: "videos" });
Video.belongsTo(User, { foreignKey: "uploadedBy", as: "user" });

User.hasMany(Vacancy, { foreignKey: "postedBy", as: "vacancies" });
Vacancy.belongsTo(User, { foreignKey: "postedBy", as: "user" });

module.exports = { 
  User,
  Payment,
  Announcement,
  Contact,
  Event,
  Gallery,
  Video,
  Service,
  Vacancy,
  Comment,
  Team,
  Testimonial,
  Document,
};
