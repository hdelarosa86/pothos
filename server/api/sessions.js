const express = require("express");
const app = express();
const chalk = require("chalk");
const { Order, Session } = require("../db/index");

app.get("/", (req, res, next) => {
  if (!req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    Session.findAll({ include: [{ model: Order }] })
      .then(sessions => res.send(sessions))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrive Sessions."));
        next(err);
      });
  }
});

module.exports = app;
