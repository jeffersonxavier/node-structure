module.exports = {
    identity: 'users_roles',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        user: {
            model: 'users',
            columnName: 'user_id',
        },
        role: {
            model: 'roles',
            columnName: 'role_name',
        }
    }
};
