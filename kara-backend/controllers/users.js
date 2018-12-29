const User = require('../models/schemas/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../models/config');

function createUser(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender
    })

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.hash = hash;
        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            return res.status(201).json(true);
        });
    })
}

function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function (err, doc) {
        if (err) {
            return next(err); // Pass to error handler
        }

        if (!doc) {
            return res.status(404).send(null);
        }

        var user = doc;
        bcrypt.compare(password, user.hash, function (err, result) {
            if (err) {
                return next(err);
            }

            if (result == true) {
                // issue jwt bearer token
                var token = jwt.sign({ id: user._id, email: user.email }, config.secret, { expiresIn: 60 });
                user.token = token;

                // Save the most recent token to database
                user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }

                    return res.status(200).json(user);
                });
            }
            else {
                return res.status(401).json(null);
            }
        })
    })
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;