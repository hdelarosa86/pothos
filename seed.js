const { db, User, Item, Cart } = require("./server/db");
const chalk = require("chalk");


const seed = () => {
    return db.sync({ force: true })
        .then(() =>
            User.bulkCreate([
                {
                    firstName: "John",
                    lastName: "Doe",
                    email: "johnDoe@gmail.com",
                    username: "johndoe",
                    password: "password"
                },
                {
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "janeDoe@gmail.com",
                    username: "janedoe",
                    password: "password"
                }]))
        .then(() => User.findOne({ where: { username: "johndoe" } }))
        .then(johndoeUser =>
            Cart.create({
                total: 10,
                userId: johndoeUser.id
            }))
        .then(johnCart => Item.bulkCreate([{
            cartId: johnCart.id,
            price: 10,
            name: "Pothos",
            size: "small",
            description: "A trailing vine.",
            imageUrl: "http://cdn.shopify.com/s/files/1/0062/8532/8445/products/Golden-Pothos-800-mainimage_grande.gif?v=1557174910"
        },
        {
            price: 10,
            name: "Palm",
            size: "large",
            description: "Tropical but indoors.",
            imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81WVK%2B1Fc4L._AC_SL1500_.jpg"
        }]))
        .then(() => User.findOne({ where: { username: "janedoe" } }))
        .then(janeUser =>
            Cart.create({
                total: 0,
                userId: janeUser.id
            }))
        .catch(e => console.log("Error with demo seed", e));
}

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
        })
}