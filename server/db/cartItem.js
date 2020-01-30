const { STRING, INTEGER, DECIMAL, UUID, UUIDV4, DATE } = require("sequelize");
const db = require("./database");
const Order = require("./order");
const Item = require("./item");
const CartItem = db.define("cartItem", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  orderId: {
    type: UUID,
    references: {
      model: Order,
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
  quantity: {
    type: INTEGER,
    defaultValue: 1
  },
  itemTotal: {
    type: DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = CartItem;
