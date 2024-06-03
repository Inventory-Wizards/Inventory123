const {items} = require('./seedData.js');

const {sequelize} = require('./db');
const {Item} = require('./models');

const seed = async () => {

    try {
        // drop and recreate tables per model definitions
        await sequelize.sync({ force: true });
    
        // insert data
        await Promise.all(items.map(items => Item.create(items)));

        console.log("db populated!");
    } catch (error) {
        console.error(error);
    }
}

seed();
