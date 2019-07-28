const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const database = require('./database');
const models = require('./models');
const auth = require('./auth');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());

    return new Promise(async (resolve, reject) => {
        const sequelize = database();
        app.set('sequelize', sequelize);

        models(sequelize).then(registeredModels => {
            // Models
            app.set('models', registeredModels);

            // Authentication
            app.set('passport', auth(app, passport));
            
            consign()
                .include('services')
                .then('controllers')
                .into(app);

            resolve(app);
        }).catch(error => reject(error));
    });
};
