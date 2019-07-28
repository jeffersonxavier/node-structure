exports.isAuthenticated = (passport) => {
    return (req, res, next) => {
        passport.authenticate('jwt', (err, result) => {
            if (err || !result) {
                res.status(401).json(err ? err : { errMessage: 'Invalid Token!' });
            } else {
                req.user = result.email;
                next();
            }
        })(req, res, next);
    };
};
