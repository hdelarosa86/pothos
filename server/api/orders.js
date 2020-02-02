const express = require("express");
const app = express();
const chalk = require("chalk");
const { User, Order, CartItem, Item } = require("../db/index");

app.get("/", (req, res, next) => {
  if (!req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    Order.findAll({
      include: [{ model: CartItem, as: "CartItem" }]
    })
      .then(orders => res.status(200).send(orders))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrive Orders."));
        next(err);
      });
  }
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
    .then(order => {
      res.send(order);
    })
    .catch(err => {
      res.status(404);
      console.error(chalk.redBright("Could not retrieve Order."));
      next(err);
    });
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
