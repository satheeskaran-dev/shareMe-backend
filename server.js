require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/cors/corsOptions");
const dbConnection = require("./config/dbConnection");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5500;
app.use(express.static(path.join(__dirname, "public")));

dbConnection();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

/* ROUTES WITH FILES */
app.use("/api/auth", authRoutes);

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
