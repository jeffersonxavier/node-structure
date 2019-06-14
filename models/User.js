module.exports = {
    identity: 'users',
    primaryKey: 'id',

    attributes: {
        id: {
            type: 'number',
            autoMigrations: { autoIncrement: true }
        },
        name: { type:'string', required: true },
        email: { type:'string', required: true },
        number: { type:'string', required: true },
        password: { type:'string', required: true },
        enabled: { type:'boolean', required: true },
        createdAt: {
            type: 'ref',
            columnName: 'created_at',
            autoCreatedAt: true
        },
        updatedAt: {
            type: 'ref',
            columnName: 'updated_at',
            autoUpdatedAt: true,
        },
    }
};
