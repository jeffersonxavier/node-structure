module.exports = {
    identity: 'roles',
    primaryKey: 'name',

    attributes: {
        name: {
            type: 'string',
            autoMigrations: { autoIncrement: true }
        },
        users: {
            collection: 'users',
            via: 'role',
            through: 'users_roles',
        },
    }
};
