const express = require("express");
const app = express();
const { User } = require("../db/index");
const chalk = require("chalk");
const moment = require("moment");

app.post("/", (req, res, next) => {
  console.log("req.logged: ", req.loggedIn);
  if (req.loggedIn) {
    req.loggedIn = false;
    req.user = null;
    res.clearCookie("id", { path: "/" });
    res.end();
  } else {
    console.log("hitting route here");
    res.status(401).redirect("/");
  }
});

module.exports = app;
