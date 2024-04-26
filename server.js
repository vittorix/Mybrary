if (process.env.NODE_ENV !== "production") {
  //load values from the .env file that in the root directory into process.env for example for mongoose connection string
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);

// http://localhost:3000/ in browser
// http://localhost:3000/authors
// http://localhost:3000/authors/new
app.listen(process.env.PORT || 3000);
