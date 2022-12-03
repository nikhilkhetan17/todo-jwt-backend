require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const connectToDB = require("./config/db");
connectToDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require("./routes/todoRoutes");
app.use("/", userRoutes);

module.exports = app;
