const { Sequelize, DataTypes, Deferrable } = require('sequelize');
const sequelize = new Sequelize('groupomaniio', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


const Post = sequelize.define('Post', {
    // Model attributes are defined here
    message: {
        type: DataTypes.TEXT,
    },
    img_url: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: 'users',

            // This is the column name of the referenced model
            key: 'id',

            // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
            deferrable: Deferrable.INITIALLY_IMMEDIATE
            // Options:
            // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
            // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
            // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        }
    }

}, {
    // Other model options go here
});


// Post.sync({ alter: true });
// `sequelize.define` also returns the model
console.log(Post === sequelize.models.Post); // true