class UserService {

    constructor(app) {
        this._app = app;
    }

    findOne(params) {
        const User = this._app.get('models').users;

        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne(params).populate('roles');
                if (!user) {
                    reject({status: 400, message: 'User not found!'});
                } else {
                    resolve(user);
                }
            } catch (error) {
                console.log(error);
                reject({status: 500, message: 'Erro in get user!'});
            }
        });
    }
}

module.exports = (app) => {
    return new UserService(app);
};
