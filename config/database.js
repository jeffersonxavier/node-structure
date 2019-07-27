const Sequelize = require('sequelize');

module.exports = () => {
    return new Sequelize('node_structure', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
};
