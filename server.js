//Importing packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

//initializing app
const app = express();

//declations
const port = process.env.PORT || 8000;

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.bvhbz.mongodb.net/ECOM?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes middlewares
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//server
app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
