module.exports = (sequelize) => {

    return {
        user: require('../models/User')(sequelize),
    };
};
