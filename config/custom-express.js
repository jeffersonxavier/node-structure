const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const models = require('./models');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    return new Promise(async (resolve, reject) => {
        const sequelize = database();
        app.set('sequelize', sequelize);

        models(sequelize).then(registeredModels => {
            app.set('models', registeredModels);

            const User = app.get('models').user;
            User.findOne({
                where: { id: 1 },
                attributes: { exclude: ['password'] },
                include: [{ all: true }],
            }).then(result => {
                const user = result.get({ plain: true });
                console.log('\n\nBuscou pelo id...', user);
            });
            
            consign()
                .include('services')
                .then('controllers')
                .into(app);

            resolve(app);
        }).catch(error => reject(error));
    });
};
