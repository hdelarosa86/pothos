const { expect } = require("chai");
const { db } = require("../server/db");
const { Order, CartItem, Item, User } = require("../server/db");

describe("Cart, Order, User and Item Association", () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  let item1, order, cartItem, user;
  beforeEach(async () => {
    user = await User.create({
      firstName: "Johnny",
      lastName: "Apples",
      username: "Japples",
      password: "easypassword"
    });
    item1 = await Item.create({
      name: "Plants Pothos",
      inventory: 3,
      size: "small",
      price: "12.19",
      description: "Hello plant"
    });
    order = await Order.create({
      status: "pending",
      purchaseDate: "02/19/2020",
      total: 301.78,
      userId: user.id
    });
    cartItem = await CartItem.create({
      itemId: item1.id,
      orderId: order.id,
      quantity: 2,
      itemTotal: 120.23
    });
  });
  afterEach(() => db.sync({ force: true }));
  //CartItem order id is not empty
  it("CartItem contains orderId", async () => {
    const johnCart = await CartItem.findAll();
    try {
      expect(johnCart[0].orderId).to.not.equal(null);
    } catch (err) {
      throw err;
    }
  });
  //CartItem has the order UUID
  it("CartItem has correct orderId", async () => {
    const johnCart = await CartItem.findAll();
    try {
      expect(johnCart[0].orderId).to.equal(order.id);
    } catch (err) {
      throw err;
    }
  });
  //CartItem has an item id
  it("CartItem contains itemId", async () => {
    const johnCart = await CartItem.findAll();
    try {
      expect(johnCart[0].itemId).to.not.equal(null);
    } catch (err) {
      throw err;
    }
  });
  //CartItem has the item UUID
  it("CartItem has correct itemId", async () => {
    const johnCart = await CartItem.findAll();
    try {
      expect(johnCart[0].itemId).to.equal(item1.id);
    } catch (err) {
      throw err;
    }
  });
  //Order has a user id that is not null
  it("Order contains userId in association", async () => {
    const johnOrder = await Order.findAll();
    try {
      expect(johnOrder[0].userId).to.not.equal(null);
    } catch (err) {
      throw err;
    }
  });
  //Order has correct user UUID
  it("Order has userId", async () => {
    const johnOrder = await Order.findAll();
    try {
      expect(johnOrder[0].userId).to.equal(user.id);
    } catch (err) {
      throw err;
    }
  });
});
