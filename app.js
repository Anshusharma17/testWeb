//import item
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//config
dotenv.config();

//app use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongo connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`Port started at ${port}`);
});

//routes
require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
