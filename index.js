const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const app = express();
const todoRouter = require("./routes/router");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(todoRouter);
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://Ruslan:2t0i1m8a@cluster0.fwrsn47.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
    app.listen(PORT, () => console.log("Server has been started..."));
  } catch (e) {
    console.log(e);
  }
}

start();
