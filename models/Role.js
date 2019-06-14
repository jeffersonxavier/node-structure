module.exports = {
    identity: 'roles',
    primaryKey: 'name',

    attributes: {
        name: {
            type: 'string',
            autoMigrations: { autoIncrement: true }
        },
    }
};
