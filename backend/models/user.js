const { Sequelize , DataTypes} = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


const User = sequelize.define('User', {
    // Model attributes are defined here
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    moderator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    img_url: {
        type: DataTypes.STRING,
    },
    biography: {
        type: DataTypes.TEXT,
    }
}, {
    // Other model options go here
});

// User.sync({ alter: true });

module.exports = sequelize.model('User');
console.log(User === sequelize.models.User); // true