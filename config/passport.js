const user = require('../models/user');
Localstrategie = require('passport-local').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');

module.exports.localstrategie = new Localstrategie({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {

    user.findOne({ email: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { errorMsg: "la combinaison n\'est pas la bonne" });
        }

        user.comparePassword(password, (err, ismatch) => {
            if (err) {
                return done(err)
            }
            if (!ismatch) {
                return done(null, false, { errorMsg: "la combinaison n\'est pas la bonne" })
            }
            return done(null, user)
        })
    })
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.secret
}

module.exports.JwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    // jwt_payload = les elment du token

    user.findById(jwt_payload._id, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) return done(null, user)
        else return done(null, false)
    })

})
module.exports.checkIsAuth = passport.authenticate('jwt', { session: false });