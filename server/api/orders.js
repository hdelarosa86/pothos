const express = require("express");
const app = express();
const { User, Order, CartItem, Item } = require("../db/index");

const paginate = (page, resultPerPage) => {
  return { limit: resultPerPage, offset: page * resultPerPage };
};

app.get("/", (req, res, next) => {
  const { perPage, page, filter } = req.query;
  if (page !== "undefined") {
    const resultPerPage = perPage;
    const { limit, offset } = paginate(page - 1, resultPerPage);
    if (filter !== "undefined") {
      Order.findAndCountAll({
        order: [[filter, "DESC"]],
        include: [{ model: CartItem, as: "CartItem" }],
        limit,
        offset
      }).then(items => {
        res.status(200).send(items);
      });
    } else {
      Order.findAndCountAll({
        include: [{ model: CartItem, as: "CartItem" }],
        limit,
        offset
      }).then(items => {
        res.status(200).send(items);
      });
    }
  } else {
    if (filter !== "undefined") {
      Order.findAll({
        order: [[filter, "DESC"]],
        include: [{ model: CartItem, as: "CartItem" }]
      })
        .then(items => res.status(200).send(items))
        .catch(err => next(err));
    } else {
      Order.findAll({
        include: [{ model: CartItem, as: "CartItem" }]
      })
        .then(items => res.status(200).send(items))
        .catch(err => next(err));
    }
  }
});
app.get("/session", (req, res, next) => {
  const id = req.cookies.sessionId;
  Order.findOne({
    where: { sessionId: id }
  })
    .then(order => {
      res.status(200).send(order)
    })
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
