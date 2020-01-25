//DATABASE && MODELS
const db = require("./database");
const User = require("./user");
const Item = require("./item");
const Cart = require("./cart");
const CartItem = require("./cartItem");
//Associations
// Item.belongsToMany(Cart, { through: CartItem });
// Cart.belongsToMany(Item, { through: CartItem });

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.hasMany(CartItem, { as: "CartItem" });

CartItem.belongsTo(Item);
Item.hasMany(CartItem);

module.exports = {
  db,
  User,
  Item,
  Cart,
  CartItem
};
