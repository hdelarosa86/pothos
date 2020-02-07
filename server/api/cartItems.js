const express = require("express");
const app = express();
const chalk = require("chalk");
const { CartItem, Order } = require("../db/index");

// These two routes are mostly for clarity but do add some functionality.
// Especially when it comes to decremeting the quantity of a cartItem.

// increment
app.put("/:id/increment/", (req, res, next) => {
  const { id } = req.params;
  const { price } = req.body;
  CartItem.findByPk(id)
    .then(foundCartItem => {
      return foundCartItem.update({
        quantity: foundCartItem.quantity + 1,
        itemTotal: parseInt(foundCartItem.itemTotal) + parseInt(price)
      });
    })
    .then(updatedCartItem => {
      return res.status(201).send(updatedCartItem);
    })
    .catch(err => next(err));
});

//decrement
app.put("/:id/decrement/", (req, res, next) => {
  const { id } = req.params;
  const { price } = req.body;
  CartItem.findByPk(id)
    .then(foundCartItem => {
      if (foundCartItem.quantity === 1 || !foundCartItem.quantity) {
        return foundCartItem.destroy();
      }
      if (foundCartItem.quantity > 1) {
        return foundCartItem.update({
          quantity: foundCartItem.quantity - 1,
          itemTotal: parseInt(foundCartItem.itemTotal) - parseInt(price)
        });
      }
    })
    .then(updatedCartItem => {
      return res.status(201).send(updatedCartItem);
    })
    .catch(err => next(err));
});

app.get("/", (req, res, next) => {
  if (!req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.status(401).redirect("/");
  } else {
    CartItem.findAll()
      .then(cartItems => res.status(200).send(cartItems))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrive Cart Items."));
        next(err);
      });
  }
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  CartItem.findOne({ where: { id } })
    .then(foundCartItem => res.status(200).send(foundCartItem))
    .catch(err => next(err));
});

//if you post an item to a cart where it already exists it increments the quantity
app.post("/", (req, res, next) => {
  const { itemId, orderId, itemTotal } = req.body;
  CartItem.findOne({
    where: {
      itemId: itemId,
      orderId: orderId
    }
  })
    .then(foundCartItem => {
      if (foundCartItem === null) {
        return CartItem.create({
          itemId: itemId,
          orderId: orderId,
          itemTotal: itemTotal
        }).then(() => res.status(201).send(console.log("item created")));
      }
      if (foundCartItem) {
        return foundCartItem
          .update({
            quantity: foundCartItem.quantity + 1,
            itemTotal: parseInt(foundCartItem.itemTotal) + parseInt(itemTotal)
          })
          .then(() => res.status(201).send(console.log("item incremented")));
      }
    })
    .catch(err => next(err));
});

app.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  CartItem.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put("/:id", (req, res, next) => {
  const { id } = req.params;
  CartItem.findByPk(id)
    .then(foundCartItem => {
      return foundCartItem.update(req.body);
    })
    .then(updatedCartItem => {
      return res.status(201).send(updatedCartItem);
    })
    .catch(err => next(err));
});

module.exports = app;
