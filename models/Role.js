const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    
    return sequelize.define('roles', {
        name: { type: Sequelize.STRING(50), allowNull: false, primaryKey: true },
    }, {
        underscored: true,
        timestamps: false,
    });
};
