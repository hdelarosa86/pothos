const { STRING, INTEGER, FLOAT, UUID, UUIDV4, BOOLEAN } = require("sequelize");
const db = require("./database");

const Item = db.define("item", {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    //   inventory: {
    //     type: INTEGER,
    //     allowNull: false,
    //     defaultValue: 0
    //   }, 

    /* In order to include the inventory key, 
    we'll have to change the associations between the tables */
    size: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [["small", "medium", "large"]]
        }
    },
    price: {
        type: FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: STRING,
        defaultValue:
            "https://cdn.dribbble.com/users/716261/screenshots/6856546/artboard_1_4x.jpg",
        validate: {
            isUrl: true
        }
    }
});

module.exports = Item;
