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


const paginate = (page, resultPerPage) => {
  return { limit: resultPerPage, offset: page * resultPerPage };
};

app.get("/", (req, res, next) => {
  if (req.user.guest || !req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
  const { perPage, page, filter } = req.query;
  if (page !== "undefined") {
    const resultPerPage = perPage;
    const { limit, offset } = paginate(page - 1, resultPerPage);
    if (filter !== "undefined") {
      User.findAndCountAll({
        order: [[filter, "DESC"]],
        limit,
        offset
      }).then(items => {
        res.status(200).send(items);
      });
    } else {
      User.findAndCountAll({
        limit,
        offset
      }).then(items => {
        res.status(200).send(items);
      });
    }
  } else {
    if (filter !== "undefined") {
      User.findAll({
        order: [[filter, "DESC"]]
      })
        .then(items => res.status(200).send(items))
        .catch(err => next(err));
    } else {
      User.findAll()
        .then(items => res.status(200).send(items))
        .catch(err => next(err));
    }
  }
});
// if (!req.user.admin) {
//   const err = new Error(chalk.redBright("Not Authorized"));
//   console.error(err);
//   res.status(401).redirect("/");
// } else {}

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
