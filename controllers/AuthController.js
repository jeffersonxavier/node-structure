module.exports = (app) => {

    const passport = app.get('passport');
    
    app.post('/api/authenticate', (req, res) => {
        passport.authenticate('local', (err, jwt) => {
            if (err) {
                res.status(401).json(err);
            } else {
                res.json(jwt);
            }
        })(req, res);
    });
};
