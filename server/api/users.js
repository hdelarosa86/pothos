const express = require("express");
const app = express();
const { User, Order } = require("../db/index");
const chalk = require("chalk");

const paginate = (page, resultPerPage) => {
  return { limit: resultPerPage, offset: page * resultPerPage };
};

app.get("/", (req, res, next) => {
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
  User.findOne({ where: { id }, include: [{ model: Order }] })
    .then(user => res.status(200).send(user))
    .catch(err => next(err));
});

app.post("/", (req, res, next) => {
  User.create(req.body)
    .then(item => res.status(201).send(item))
    .catch(err => next(err));
});

app.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(foundUser => {
      return foundUser.update(req.body);
    })
    .then(updatedUser => {
      return res.status(201).send(updatedUser);
    })
    .catch(err => next(err));
});

module.exports = app;
