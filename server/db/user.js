const { STRING, INTEGER, BIGINT, UUID, UUID4, BOOLEAN } = require("sequelize");
const db = require("./database")
//Leaving some keys commented out to simplify building tier one routes/tests/components

const User = db.define("user", {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUID4
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    username: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    admin: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imageUrl: {
        type: STRING,
        defaultValue: "https://cdn.dribbble.com/users/405145/screenshots/4093229/08_plant_1_4x3.jpg",
        validate: {
            isUrl: true
        }

    },
    // mailLine1: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // mailLine2: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // mailCity: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // mailState: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // mailZip: {
    //     type: INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // bill1: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // bill2: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // billCity: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // billState: {
    //     type: STRING,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // billZip: {
    //     type: INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // creditNum: {
    //     type: BIGINT,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // creditCVV: {
    //     type: INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },
    // creditExpirMonth: {
    //     type: INTEGER,
    //     allowNull: false,
    //     validate: {
    //         isCreditCard:true
    //     }
    // },
    // creditExpirYear: {
    //     type: INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // },

})

module.exports = User