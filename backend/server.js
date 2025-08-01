const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = require("./config/db");
require("./models");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const contactRoutes = require("./routes/contactRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const videoRoutes = require("./routes/videoRoutes");
const teamRoutes = require("./routes/teamRoutes");
//const serviceRoutes = require("./routes/serviceRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");
const authRoutes = require("./routes/authRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const documentRoutes = require("./routes/documentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express(); // this is to create an express app to handle HTTP requests
// all the middlewareS are seted here undre bro!
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://soserunion.com",
      "https://www.soserunion.com",
    ],
    credentials: true,
    exposedHeaders: ["Content-Disposition"],
  })
);

app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true })); // and this is to parse the request body

// this is to create fild to set up for the uploads
app.use("/uploads", express.static("uploads"));

// and here i set the routes for the app

app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/team", teamRoutes);
//app.use("/api/services", serviceRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/chat", chatRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected successfully");
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () =>
      console.log(
        `Server running on port ${PORT} at ${new Date().toLocaleString(
          "en-US",
          { timeZone: "EAT" }
        )}`
      )
    );
    server.timeout = 1800000; // 30 minutes
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
