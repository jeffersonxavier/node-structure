module.exports = (sequelize) => {

    return new Promise((resolve, reject) => {
        const User = require('../models/User')(sequelize);
        const Role = require('../models/Role')(sequelize);
        const UserRole = sequelize.define('users_roles', { }, { timestamps: false, underscored: true });

        User.belongsToMany(Role, { through: UserRole });
        Role.belongsToMany(User, { through: UserRole });

        const models = {
            user: User,
            role: Role,
        };

        sequelize.sync().then(() => {
            console.log('\nFinish Migrations!');
            User.findOrCreate({
                where: { email: 'admin@email.com' },
                defaults: {
                    name: 'Administrador',
                    number: '000.000.000-00',
                    password: 'admin',
                    enabled: true,
                }
            }).spread(user => {
                Role.findOrCreate({ where: { name: 'ROLE_USER' } });
                Role.findOrCreate({ where: { name: 'ROLE_ADMIN' } }).spread((role) => {
                    user.addRole(role);
                });
            });

            resolve(models);
        }).catch(error => reject(error));
    });
};
