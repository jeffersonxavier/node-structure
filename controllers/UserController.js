const middlewares = require('../utils/middlewares');

module.exports = (app) => {

    const passport = app.get('passport');

    app.get('/api/users/current', middlewares.isAuthenticated(passport), (req, res) => {
        const userService = app.services.UserService;
        userService.findOne({ email: req.user }).then(user => {
            res.json(user);
        }).catch(error => {
            res.json(error)
        });
    });
};
