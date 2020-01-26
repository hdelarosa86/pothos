const express = require("express");
const app = express();
const { User, Order } = require("../db/index");

app.get("/", (req, res, next) => {
  User.findAll({ include: [{ model: Order }] })
    .then(users => res.status(200).send(users))
    .catch(err => next(err));
});

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
