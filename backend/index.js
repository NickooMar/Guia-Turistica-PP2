const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

const userRoutes = require("./routes/user.routes");

const app = express();

//Database connection
const connectDB = require("./db/db");
connectDB();

//Middleware Initialization

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", //localización del cliente
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//----------------------------

//Rutas

app.use(userRoutes)

//----------------------------

//Open Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is Working ${PORT}`));
