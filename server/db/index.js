//DATABASE && MODELS
const db = require("./database");
const User = require("./user");
const Item = require("./item");
const Order = require("./order");
const CartItem = require("./cartItem");
//Associations

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(CartItem, { as: "CartItem" });
CartItem.belongsTo(Order);

CartItem.belongsTo(Item);
Item.hasMany(CartItem);

module.exports = {
  db,
  User,
  Item,
  Order,
  CartItem
};
