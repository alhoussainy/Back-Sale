const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userShema = mongoose.Schema(

    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }

)

userShema.pre('save', function (next) {

    const sale_factor = 5;
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(sale_factor, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(this.password, salt, (err, passwordhashed) => {
            if (err) {
                return next(err)
            }
            this.password = passwordhashed
            return next()
        })
    })
})

userShema.methods.comparePassword = function (passwordAttempt, cb) {

    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {

        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });

};

let user
try {
    user = mongoose.model('User')
} catch (e) {
    user = mongoose.model('User', userShema)
}

module.exports = user