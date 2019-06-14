const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwtSecret = 'my-jwt-secret-change-in-production';

module.exports = (app, passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        const User = app.get('models').users;

        User.findOne({ email }).then(user => {
            if (!user || !user.enabled) {
                return done({ errMessage: 'Invalid User!' });
            } else {
                bcrypt.compare(password, user.password, (err, valid) => {
                    if (err) {
                        return done(err);
                    } else if (!valid) {
                        return done({ errMessage: 'Invalid Password!' });
                    } else {
                        const maxDate = new Date();
                        maxDate.setDate(maxDate.getDate() + 1); // Token valid by 24 hours
                        
                        const payload = {
                            email: user.email,
                            generatedAt: maxDate,
                        }
                        done(null, { token: jwt.sign(payload, jwtSecret) });
                    }
                });
            }
        }).catch(err => {
            done(err);
        });
    }));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
    }, (payload, done) => {
        if (!payload || !payload.generatedAt) {
            return done({ errMessage: 'Invalid Payload!'});
        } else if (new Date(payload.generatedAt) < new Date()) {
            return done({ errMessage: 'Token Expired!'});
        } else {
            return done(null, payload);
        }
    }));

    return passport;
};
