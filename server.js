const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
// const corsOptions = require("./config/cors/corsOptions");
const dbConnection = require("./config/dbConnection");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const fileUpload = require("express-fileupload");
const baseName = require("./baseName");

const PORT = process.env.PORT || 5500;

app.use(express.static(path.join(__dirname, "public")));

dbConnection();
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use(cors());

app.use(logger);

app.use(fileUpload());

/* ROUTES  */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("mongodb connected");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log("mongoose error details :", err);

  logEvents(
    `${err.no}\t${err.code}\t${err.syscall}\t ${err.hostname}`,
    "mongoErrorLog.log"
  );
});
