const express = require("express");
const app = express();
const { User, Order, CartItem, Item } = require("../db/index");

app.get("/", (req, res, next) => {
  Order.findAll({
    include: [{ model: CartItem, as: "CartItem" }]
  })
    .then(orders => res.status(200).send(orders))
    .catch(err => next(err));
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Order.findOne({
    where: { id },
    include: [
      {
        model: CartItem,
        as: "CartItem",
        where: { orderId: id },
        include: [
          {
            model: Item
          }
        ]

      }
    ]
  })
    .then(order => res.status(200).send(order))
    .catch(err => next(err));
});

app.post("/", (req, res, next) => {
  Order.create(req.body)
    .then(order => res.status(201).send(order))
    .catch(err => next(err));
});

app.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Order.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put("/:id", (req, res, next) => {
  const { id } = req.params;
  Order.findByPk(id)
    .then(foundOrder => {
      return foundOrder.update(req.body);
    })
    .then(updatedOrder => {
      return res.status(201).send(updatedOrder);
    })
    .catch(err => next(err));
});

module.exports = app;
