module.exports = (sequelize) => {

    return new Promise((resolve, reject) => {
        const User = require('../models/User')(sequelize);
        const models = {
            user: User,
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
            });

            resolve(models);
        }).catch(error => reject(error));
    });
};
