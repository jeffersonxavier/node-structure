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
        app.set('models', models(sequelize));
        const User = app.get('models').user;

        sequelize.sync().then(() => {
            console.log('\nFinish Migrations!');
            User.create({
                name: 'Fulano',
                email: 'Fulan1a1a11',
                number: '1213.11113.1111',
                password: 'admin',
            }).then(result => {
                console.log('\n\nuser created...', result.get({ plain: true }));
                
            });

            consign()
                .include('services')
                .then('controllers')
                .into(app);

            resolve(app);
        }).catch(error => reject(error));
    });
};
