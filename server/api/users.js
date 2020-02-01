const express = require("express");
const app = express();
const { User, Order } = require("../db/index");
const chalk = require("chalk");

//middleware to verify guest, user or admin privileges
app.use((req, res, next) => {
  if (!req.user) {
    req.user = {};
    req.user.guest = true;
    req.user.id = req.cookies.sessionId;
  }
  if (!req.user.admin) {
    req.adminAuth = false;
    next();
  } else {
    req.adminAuth = true;
    next();
  }
});

app.get("/", (req, res, next) => {
  if (req.user.guest || !req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    User.findAll({ include: [{ model: Order }] })
      .then(users => res.status(200).send(users))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrive Users."));
        next(err);
      });
  }
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if ((!req.user || !req.adminAuth) && req.user.id !== id) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    User.findOne({ where: { id }, include: [{ model: Order }] })
      .then(user => res.status(200).send(user))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrieve User."));
        next(err);
      });
  }
});

app.post("/", (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
    .then(user => res.status(201).send(user))
    .catch(err => {
      console.error(chalk.redBright("Could not create new User."));
      next(err);
    });
});

app.delete("/:id", (req, res, next) => {
  if (!req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    const { id } = req.params;
    User.destroy({
      where: {
        id
      }
    })
      .then(() => res.status(200).end())
      .catch(err => next(err));
  }
});

app.put("/:id", (req, res, next) => {
  const { id } = req.params;
  if (req.user.id !== id || !req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    User.findByPk(id)
      .then(foundUser => {
        return foundUser.update(req.body);
      })
      .then(updatedUser => {
        return res.status(201).send(updatedUser);
      })
      .catch(err => {
        console.error("Could not update User.");
        next(err);
      });
  }
});

module.exports = app;
