const express = require("express");
const app = express.Router();
const chalk = require("chalk");
const { Item } = require("../db/index");

const paginate = (page, resultPerPage) => {
  return { limit: resultPerPage, offset: page * resultPerPage };
};

app.get("/", (req, res, next) => {
  if (
    Object.entries(req.query).length === 0 &&
    req.query.constructor === Object
  ) {
    Item.findAll()
      .then(items => res.status(200).send(items))
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not retrieve Items."));
        next(err);
      });
  } else {
    const { perPage, page, filter } = req.query;
    if (page !== "undefined") {
      const resultPerPage = perPage;
      const { limit, offset } = paginate(page - 1, resultPerPage);
      if (filter !== "undefined") {
        Item.findAndCountAll({
          order: [[filter, "DESC"]],
          limit,
          offset
        }).then(items => {
          res.status(200).send(items);
        });
      } else {
        Item.findAndCountAll({
          limit,
          offset
        }).then(items => {
          res.status(200).send(items);
        });
      }
    } else {
      if (filter !== "undefined") {
        Item.findAll({
          order: [[filter, "DESC"]]
        })
          .then(items => res.status(200).send(items))
          .catch(err => next(err));
      } else {
        Item.findAll()
          .then(items => res.status(200).send(items))
          .catch(err => next(err));
      }
    }
  }
});

app.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Item.findOne({ where: { id } })
    .then(item => res.status(200).send(item))
    .catch(err => next(err));
});

// app.post("/", (req, res, next) => {
//   if (!req.adminAuth) {
//     console.error(chalk.redBright("Not Authorized."));
//     res.sendStatus(401);
//   } else {
//     Item.create(req.body)
//       .then(item => res.status(201).send(item))
//       .catch(err => {
//         res.status(404);
//         console.error(chalk.redBright("Could not create Item."));
//         next(err);
//       });
//   }
// });

// app.delete("/:id", (req, res, next) => {
//   if (!req.adminAuth) {
//     console.error(chalk.redBright("Not Authorized."));
//     res.sendStatus(401);
//   } else {
//     const { id } = req.params;
//     Item.destroy({
//       where: {
//         id
//       }
//     })
//       .then(() => res.status(200).end())
//       .catch(err => {
//         {
//           res.status(404);
//           console.error(chalk.redBright("Could not delete Item."));
//           next(err);
//         }
//       });
//   }
// });

// Post/Delete routes commented out to facilitate working on the Admin Dashboard.
// After completion of the Dashboard, the Dev Post/Delete Route should be deleted
// and the above routes should be used

//Dev Post Route below...
app.post("/", (req, res, next) => {
  Item.create(req.body)
    .then(item => res.status(201).send(item))
    .catch(err => {
      res.status(404);
      console.error(chalk.redBright("Could not create Item."));
      next(err);
    });
});

app.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Item.destroy({
    where: {
      id
    }
  })
    .then(() => res.status(200).end())
    .catch(err => next(err));
});

app.put("/:id", (req, res, next) => {
  if (!req.adminAuth) {
    console.error(chalk.redBright("Not Authorized."));
    res.sendStatus(401);
  } else {
    const { id } = req.params;
    Item.findByPk(id)
      .then(foundItem => {
        return foundItem.update(req.body);
      })
      .then(updatedItem => {
        return res.status(201).send(updatedItem);
      })
      .catch(err => {
        res.status(404);
        console.error(chalk.redBright("Could not update Item."));
        next(err);
      });
  }
});

module.exports = app;
