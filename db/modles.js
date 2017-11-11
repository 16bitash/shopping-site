const Sequelize = require("sequelize");
const DB = require("../config.json").DB;
const datatypes = Sequelize.DataTypes;

const db = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.DIALECT,
    // logging: false
})

const Items = db.define('items', {
    itemId: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: datatypes.STRING,
        allowNull: false
    },
    description: {
        type: datatypes.TEXT
    },
    price: {
        type: datatypes.INTEGER,
        allowNull: false
    },
    availability: {
        type: datatypes.BOOLEAN,
        defaultValue: true
    },
    imageName: {
        type: datatypes.STRING,
        defaultValue: "Placeholder"
    }
}, {
    freezeTableName: true,
    returning: true
});

Items.sync().then(() => {
    console.log("Database Connected!");
})

exports.Items = Items;

