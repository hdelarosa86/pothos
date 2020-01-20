const express = require('express');
const app = express();
const { CartItem } = require('../db/index');

app.get('/', (req, res, next) => {
  CartItem.findAll()
    .then(cartItems => res.status(200).send(cartItems))
    .catch(err => next(err));
});

app.get('/:id', (req, res, next) => {
  const { id } = req.params;
  CartItem.findOne({ where: id });
});

app.post('/', (req, res, next) => {
  CartItem.create(req.body)
    .then(cartItem => res.status(201).send(cartItem))
    .catch(err => next(err));
});

app.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  CartItem.destroy({
    where: {
      id,
    },
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put('/:id', (req, res, next) => {
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
