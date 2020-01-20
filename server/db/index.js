//DATABASE && MODELS
const db = require("./database");
const User = require("./user");
const Item = require("./item");
const Cart = require("./cart");
const CartItem = require("./cartItem");
//Associations
// Item.belongsToMany(Cart, { through: CartContent, });
// Cart.belongsToMany(Item, { through: CartContent });

Cart.belongsTo(User);
User.hasMany(Cart);

module.exports = {
  db,
  User,
  Item,
  Cart,
  CartItem
};
