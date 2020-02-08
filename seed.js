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
        }, {
          price: 15,
          name: "Monstera",
          size: "medium",
          description: "Famous for its quirky natural leaf holes",
          imageUrl: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_small_hyde_black_768x.jpg?v=1576785440"
        }, {
          price: 5,
          name: "Marimo Moss Ball",
          size: "small",
          description: "Mossy moss",
          imageUrl: "https://cdn.shopify.com/s/files/1/0662/5489/products/Moon_Vase_Marimo_Moss_Set_-_pistils_nursery_550x825.jpg?v=1553640557"
        }, {
          price: 7,
          name: "Parlor Palm",
          size: "medium",
          description: "Tropical vibes for indoor spaces",
          imageUrl: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_parlor-palm_hover_cream_1024x1024.jpg?v=1576538040"
        }, {
          price: 10,
          name: "Birds Nest Fern",
          size: "large",
          description: "Wavy ripple-edge fronds",
          imageUrl: "https://cdn.shopify.com/s/files/1/0150/6262/files/the-sill_birds-nest-fern_variant_small_grant_terracotta_768x.jpg?v=1579643976"
        }, {
          price: 13,
          name: "Pony Tail Palm",
          size: "small",
          description: "Fun, distinct, and hardy.",
          imageUrl: "https://images.squarespace-cdn.com/content/v1/56ec734137013bc0124cf412/1462412873622-VOUNCRN45MYSI458T9FL/ke17ZwdGBToddI8pDm48kMr7CU_Eq8MlYvV591eHZrZ7gQa3H78H3Y0txjaiv_0fG8pAgKpTHPLw24EVOXPIwohVU6YYtSQ8H7TvSNSjCpV6ipLkkBaudvXjfpf9v_JVS0k9nmfOWkBD2X4dgpGrpemn33SEXKJE7ZKhuc-wTLTOxYQuRB20IeNFFQDv_UM4/Ponytail2.jpg"
        }, {
          price: 15,
          name: "Monstera branches",
          size: "large",
          description: "All the vibes, none of the maintenance",
          imageUrl: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-monstera-leaves_variant_small_grow-pot_none_768x.jpg?v=1570373110"
        }, {
          price: 3,
          name: "Silver Dollar Eucalyptus",
          size: "small",
          description: "Elegant and simple",
          imageUrl: "http://t0.gstatic.com/images?q=tbn%3AANd9GcQQCyHjHYvn1X4BXfZZRYoLBQwrvJwb5wjRNO-MTVAJjs_fk5XcgTQ&usqp=CAc"
        }, {
          price: 25,
          name: "Bamboo",
          size: "large",
          description: "Max on positive energy, prosperity and luck",
          imageUrl: "https://i.ebayimg.com/images/g/zCQAAOSw5hVdJjr3/s-l640.jpg"
        }, {
          price: 30,
          name: "Orchid",
          size: "small",
          description: "Elegant but tricky to care for.",
          imageUrl: "https://sf.tac-cdn.net/images/products/large/FTD-S11-4462.jpg?auto=webp&quality=80"
        }
      ])
    )
    .then(() => User.findOne({ where: { username: "johndoe" } }))
    .then(johndoeUser => Session.create({ id: johndoeUser.id }))
    .then(johnSession =>
      Order.create({
        checkoutTotal: 10,
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
};

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
