const passport = require('passport');
require('dotenv').config({ path: '../config/.env' })
const jwt = require('jsonwebtoken')
const user = require('../models/user')



function generatetoken(user) {
    return jwt.sign(user, process.env.secret, { expiresIn: '1y' })
}

module.exports.login = async (req, res, next) => {
    console.log("login");
    await passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(400).json(err)
        }
        if (!user) {
            return res.status(422).json(info)
        }

        res.status(200).json({
            user: user,
            token: ' jwt ' + generatetoken({
                _id: user._id,
                email: user.email,
                password: user.password
            })
        })
    })(req, res, next)
}

module.exports.register = async (req, res, next) => {
    console.log("register")
    await new user(req.body).save(
        (err, docs) => {
            if (err) {
                return res.status(400).json(err)
            }
            res.status(200).json({
                user: docs,
                token: 'jwt  ' + generatetoken({
                    _id: user._id,
                    email: user.email,
                    password: user.password
                }),
            })

        }

    )
}


module.exports.logOut = async (req, res) => {
    await req.logout();
    await res.redirect('/');
}




