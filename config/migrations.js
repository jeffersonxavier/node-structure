const fs = require('fs');
const mysql = require('mysql');
const connection = require('./connection');

const dbConn = mysql.createConnection({
    host: connection.host,
    user: connection.user,
    password: connection.password,
    database: connection.database,
    multipleStatements: true,
});

const getMigrations = () => {
    return new Promise((resolve) => {
        resolve(fs.readdirSync('migrations'));
    });
};

const getLastVersion = (connection) => {
    return new Promise((resolve) => {
        connection.query(
            'SELECT version FROM changelog ORDER BY (version * 1) DESC LIMIT 1', (err, results) => {
            if (!err && results && results.length) {
                resolve(parseInt(results[0].version));
            }
            
            resolve(-1);
        });
    });
};

const executeQuery = (connection, sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err) => {
            if (err) {
                console.log(err);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = () => {

    return new Promise(async (resolve, reject) => {
        const migrations = await getMigrations();
        if (!migrations || !migrations.length)
            reject('Migrations not found!');
        
        dbConn.connect();

        const lastVersion = await getLastVersion(dbConn);
        for (const migration of migrations) {
            const version = migration.substring(0, 14);
            const name = migration.substring(15);
            
            if (parseInt(version) <= lastVersion)
                continue;
            
            console.log('+ Executing Migration: ' + migration);
            const sql = fs.readFileSync('migrations/' + migration).toString();
            
            let result = await executeQuery(dbConn, sql);
            if (!result)
                break;

            const sqlInsert = "INSERT INTO changelog (`version`, `name`) VALUES ('" + version + "', '" + name + "')";
            result = await executeQuery(dbConn, sqlInsert);
            if (!result)
                break;
    
            console.log('\t- Finalize Migration');
        }

        console.log('\nFinalize all migrations.\n');
        dbConn.end();
        resolve();
    });
};
