const express = require("express");
const app = express();
const { Item } = require("../db/index");

app.get("/", (req, res, next) => {
  Item.findAll()
    .then(items => res.status(200).send(items))
    .catch(err => next(err));
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Item.findOne({ where: { id } })
    .then(item => res.status(200).send(item))
    .catch(err => next(err));
});

app.post("/", (req, res, next) => {
  Item.create(req.body)
    .then(item => res.status(201).send(item))
    .catch(err => next(err));
});

app.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Item.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Item.findByPk(id)
    .then(foundItem => {
      return foundItem.update(req.body);
    })
    .then(updatedItem => {
      return res.status(201).send(updatedItem);
    })
    .catch(err => next(err));
});

module.exports = app;
