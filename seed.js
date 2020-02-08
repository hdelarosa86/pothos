const { db, User, Item, Order, CartItem, Session } = require("./server/db");
const chalk = require("chalk");

const seed = () => {
  return db
    .sync({ force: true })
    .then(() =>
      User.bulkCreate(
        [
          {
            firstName: "John",
            lastName: "Doe",
            email: "johnDoe@gmail.com",
            username: "johndoe",
            password: "password2"
          },
          {
            firstName: "Jane",
            lastName: "Doe",
            email: "janeDoe@gmail.com",
            username: "janedoe",
            password: "password1",
            admin: true
          }
        ],
        { individualHooks: true }
      )
    )
    .then(() =>
      Item.bulkCreate([
        {
          price: 5,
          name: "Laurentii",
          size: "large",
          description: "The Snake Plant",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_prospect_blush_768x.jpg?v=1578340438"
        },
        {
          price: 20,
          name: "ZZ",
          size: "small",
          description: "A purifying plant for beginners",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-zz-plant_variant_large_grant_pale-grey_768x.jpg?v=1579805696"
        }
      ])
    )
    .then(() => User.findOne({ where: { username: "johndoe" } }))
    .then(johndoeUser => Session.create({ id: johndoeUser.id }))
    .then(johnSession =>
      Order.create({
        total: 10,
        userId: johnSession.id,
        sessionId: johnSession.id
      })

    )
    .then(johnCart =>
      Item.create({
        price: 10,
        name: "Pothos",
        size: "small",
        description: "A trailing vine.",
        imageUrl:
          "http://cdn.shopify.com/s/files/1/0062/8532/8445/products/Golden-Pothos-800-mainimage_grande.gif?v=1557174910"
      }).then(pothosItem =>
        CartItem.create({
          itemId: pothosItem.id,
          orderId: johnCart.id,
          itemTotal: pothosItem.price
        })
      )
    )
    .then(() => User.findOne({ where: { username: "janedoe" } }))
    .then(janeUser =>
      Session.create({ id: janeUser.id }).then(janeSession =>
        Order.create({
          total: 0,
          userId: janeSession.id,
          sessionId: janeSession.id
        })
      )
    );


module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(chalk.greenBright("Successful seeding in pothos."));
      db.close();
    })
    .catch(err => {
      console.error(chalk.redBright("Error with seeding pothos!"));
      console.error(err);
      db.close();
    });
}
