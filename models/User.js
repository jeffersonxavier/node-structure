const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    
    return sequelize.define('users', {
        name: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
        number: { type: Sequelize.STRING(20), allowNull: false, unique: true },
        password: { type: Sequelize.STRING(100), allowNull: false },
        enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    }, {
        underscored: true,
        hooks: {
            beforeCreate: (user) => {
                const hash = bcrypt.hashSync(user.password, 10);
                user.password = hash;
            },
        },
        setterMethods: {
            number: function(value) {
                return this.setDataValue('number', value.toString().replace(/\D+/g, ''));
            },
        },
    });
};
