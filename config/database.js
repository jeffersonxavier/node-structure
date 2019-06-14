const Waterline = require('waterline');
const mysqlAdapter = require('sails-mysql');
const connection = require('./connection');

const datastore = {
    adapters: {
        'sails-mysql': mysqlAdapter
    },
  
    datastores: {
        default: {
            adapter: 'sails-mysql',
            url: `mysql://${connection.user}:${connection.password}@${connection.host}:${connection.port}/${connection.database}`,
        }
    }
};

module.exports = () => {
    const waterline = new Waterline();
    waterline.registerModel(Waterline.Collection.extend(require('../models/User')));

    return new Promise((resolve, reject) => {
        waterline.initialize(datastore, (err, models) => {
            if (err) {
                reject(err);
            }
            console.log('\nDatabase initialize success.\n');
            resolve(models.collections);
        });
    });
};
