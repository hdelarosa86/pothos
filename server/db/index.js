//DATABASE && MODELS
const db = require("./database")
const User = require("./user")
const Item = require("./item")
const Cart = require("./cart")

//Associations
Item.belongsTo(Cart)
Cart.hasMany(Item)

Cart.belongsTo(User)
User.hasMany(Cart)

module.exports = {
    db, User, Item, Cart
}