const { STRING, INTEGER, FLOAT, UUID, UUIDV4, DATE } = require("sequelize");
const db = require("./database");
const Cart = require("./cart");
const Item = require("./item");
const CartItem = db.define("cartItem", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  cartId: {
    type: UUID,
    references: {
      model: Cart,
      key: "id"
    }
  },
  itemId: {
    type: UUID,
    references: {
      model: Item,
      key: "id"
    }
  },
  quanity: {
    type: INTEGER
  },
  totalPrice: {
    type: FLOAT
  }
});

module.exports = CartItem;
