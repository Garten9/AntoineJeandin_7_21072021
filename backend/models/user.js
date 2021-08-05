const { Sequelize , DataTypes} = require('sequelize');
const sequelize = new Sequelize('groupomaniio', 'root', 'root', {
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
        allowNull: false
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



// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true