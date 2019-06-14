const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const migrations = require('./migrations');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    return new Promise(async (resolve, reject) => {
        try {
            await migrations();
        
            consign()
                .include('services')
                .then('controllers')
                .into(app);

            resolve(app);
        } catch (error) {
            reject(error);
        }
    });
};
