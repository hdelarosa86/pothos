const router = require("express").Router();
const axios = require("axios");
const chalk = require("chalk");
const { User, Session, Order } = require("../db/index");
require("dotenv").config();

router.get("/github/login", (req, res, next) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get("/github/callback", (req, res, next) => {
  const { code } = req.query;

  axios
    .post(
      `https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      {},
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
    .then(async res => {
      req.github_access_token = res.data.access_token;
      return (
        await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${req.github_access_token}`
          }
        })
      ).data;
    })

    .then(github_data => {
      User.create({
        firstName: github_data.name.split(" ")[0],
        lastName: github_data.name.split(" ")[1],
        email: github_data.email,
        password: "password",
        github_access_token: true
      });
      res.redirect("/");
    })
    .catch(err => {
      console.log(chalk.red("Error authenticating with Github."));
      console.error(err);
      res.end();
    });
});

module.exports = router;

// User.findOne({
//   where: {
//     firstName: github_data.name.split(" ")[0],
//     lastName: github_data.name.split(" ")[1],
//     email: github_data.email
//   }
// })
//   .then(user => {
//     if (!user) {
//       console.log("cookie !user: ", res.cookies);
//       User.create({
//         firstName: github_data.name.split(" ")[0],
//         lastName: github_data.name.split(" ")[1],
//         email: github_data.email,
//         password: "password",
//         github_access_token: true
//       }).then(user => {
//         console.log("cookie: ", res.cookies);
//         Session.create({ id: user.id }).then(session => {
//           Order.create({
//             sessionId: session.id,
//             userId: session.id
//           });
//         });
//       });
//     }
//   })
//   .catch(err => next(err));
//
