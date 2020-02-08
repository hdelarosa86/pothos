const {
  STRING,
  INTEGER,
  DECIMAL,
  UUID,
  UUIDV4,
  BOOLEAN,
  TEXT
} = require("sequelize");
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
  inventory: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  size: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [["small", "medium", "large"]]
    }
  },
  price: {
    type: DECIMAL(10, 2),
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
    type: TEXT,
    defaultValue:
      "https://cdn.dribbble.com/users/716261/screenshots/6856546/artboard_1_4x.jpg",
    validate: {
      isUrl: true
    }
  }
});

module.exports = Item;
