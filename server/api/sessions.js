const express = require("express");
const app = express();
const { Order, Session } = require("../db/index");

app.get("/", (req, res, next) => {
  Session.findAll({ include: [{ model: Order }] })
    .then(sessions => res.send(sessions))
    .catch(err => console.log(err));
});

module.exports = app;
