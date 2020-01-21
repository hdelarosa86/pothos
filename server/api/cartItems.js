const express = require("express");
const app = express();
const { CartItem } = require("../db/index");

// these two routes are mostly for clarity but do add some functionality. Especially when it comes to decremeting the quantity of a cartItem.

// increment
app.put("/:id/increment/", (req, res, next) => {
  const { id } = req.params;
  CartItem.findByPk(id)
    .then(foundCartItem => {
      return foundCartItem.update({ quantity: foundCartItem.quantity + 1 });
    })
    .then(updatedCartItem => {
      return res.status(201).send(updatedCartItem);
    })
    .catch(err => next(err));
});

//decrement
app.put("/:id/decrement/", (req, res, next) => {
  const { id } = req.params;
  CartItem.findByPk(id)
    .then(foundCartItem => {
      if (foundCartItem.quantity === 1) {
        foundCartItem.destroy();
      }
      if (foundCartItem.quantity > 1) {
        foundCartItem.update({ quantity: foundCartItem.quantity - 1 });
      }
    })
    .then(updatedCartItem => {
      return res.status(201).send(updatedCartItem);
    })
    .catch(err => next(err));
});

app.get("/", (req, res, next) => {
  CartItem.findAll()
    .then(cartItems => res.status(200).send(cartItems))
    .catch(err => next(err));
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  CartItem.findOne({ where: id });
});

//if you post an item to a cart where it already exists it increments the quantity
app.post("/", (req, res, next) => {
  const { itemId, cartId } = req.body;
  CartItem.findOne({
    where: {
      itemId: itemId,
      cartId: cartId
    }
  })
    .then(foundCartItem => {
      console.log(foundCartItem);
      if (foundCartItem === null) {
        CartItem.create({ itemId: itemId, cartId: cartId }).then(() =>
          res.status(201).send(console.log("item created"))
        );
      }
      if (foundCartItem) {
        foundCartItem
          .update({ quantity: foundCartItem.quantity + 1 })
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
