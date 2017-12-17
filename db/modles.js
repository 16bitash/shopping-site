const Sequelize = require("sequelize");
const DB = require("../config.json").DB;
const datatypes = Sequelize.DataTypes;

const db = new Sequelize('postgres://vutpvortunrwqj:3eda2f53dccd7642ade2203acf7d3dc9d25cda9bae245cdbeae68013cb28ae2a@ec2-184-72-228-128.compute-1.amazonaws.com:5432/dq1bomrj39o6t');

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
});

exports.Items = Items;

