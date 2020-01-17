const express = require('express');
const path = require('path');
const { db } = require('./db')
const chalk = require("chalk")

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// body parsing middleware
app.use(express.json());

// static middleware
app.use(express.static(path.join(__dirname, "../static")));

// api routes
app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
}); // Send index.html for any other requests

db.sync().then(() => {
  console.log(chalk.magenta('db synced'));
  app.listen(PORT, () => {
    console.log(chalk.cyan("I'm running on", PORT));
  })
})
