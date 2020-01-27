const express = require("express");
const path = require("path");
const { db } = require("./db");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//cookie parser
app.use(cookieParser());

// body parsing middleware
app.use(express.json());

//adding this middleware just to keep track of api calls as our app gets larger
app.use((req, res, next) => {
  console.log(chalk.magenta(`${req.method} ${req.path}`));
  next();
});


// static middleware
app.use(express.static(path.join(__dirname, "../static")));
 //cookie
// api routes



//app.use((req,res,next) =>{require("./cookies")});
app.use("/api", require("./api"));



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
}); // Send index.html for any other requests

db.sync().then(() => {
  console.log(chalk.magenta("db synced"));
  app.listen(PORT, () => {
    console.log(chalk.cyan("I'm running on", PORT));
  });
});
