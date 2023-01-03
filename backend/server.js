const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./db");
const cors = require("cors");

dotenv.config();

app.use(express.json())
app.use(cors());

const adminRoute = require("./Routes/adminRoutes");
const userRoute = require("./Routes/userRoutes");
const passwordResetRoutes = require("./routes/passwordReset");


// routes

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/password-reset", passwordResetRoutes);

//errror handling
const notFound = (req, res, next) => {
    const error = new Error("Not Found");
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
    });
  };


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));