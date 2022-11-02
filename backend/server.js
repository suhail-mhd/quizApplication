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


// routes

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));