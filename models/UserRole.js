module.exports = (sequelize) => {
    
    return sequelize.define('users_roles', { }, { timestamps: false, underscored: true });
};
