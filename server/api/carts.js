const express = require('express');
const app = express();
const { User, Cart, Item } = require('../db/index');

app.get('/', (req, res, next) => {
  Cart.findAll({ include: [{ model: User, Item }] })
    .then(carts => res.status(200).send(carts))
    .catch(err => next(err));
});

app.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Cart.findOne({ where: id, include: [{ model: Cart, Item }] });
});

app.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then(cart => res.status(201).send(cart))
    .catch(err => next(err));
});

app.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Cart.destroy({
    where: {
      id,
    },
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put('/:id', (req, res, next) => {
  const { id } = req.params;
  Cart.findByPk(id)
    .then(foundCart => {
      return foundCart.update(req.body);
    })
    .then(updatedCart => {
      return res.status(201).send(updatedCart);
    })
    .catch(err => next(err));
});

module.exports = app;
