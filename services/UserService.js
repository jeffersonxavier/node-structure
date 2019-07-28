class UserService {

    constructor(app) {
        this._app = app;
    }

    findOne(params) {
        const User = this._app.get('models').user;

        return new Promise(async (resolve, reject) => {
            User.findOne({
                where: params,
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
                include: [{ all: true }],
            }).then(result => {
                if (!result) {
                    reject({status: 400, message: 'User not found!'});
                } else {
                    const user = result.get({ plain: true });
                    for (const role of user.roles) {
                        delete role.users_roles;
                    }
                    resolve(user);
                }
            });
        });
    }
}

module.exports = (app) => {
    return new UserService(app);
};
