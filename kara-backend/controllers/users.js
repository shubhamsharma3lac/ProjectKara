const User = require('../models/schemas/users');
const bcrypt = require('bcrypt');

function createUser(req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: req.body.password,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender
    })

    user.save(function (err, user) {
        console.log(err);
    });
}

function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function (err, doc) {
        if(err){
            console.log(err);
            return res.status(401).send('user not found');
        }

        var user = doc;
        bcrypt.compare(password, user.hash, function(err, result){
            if(err){
                throw new Error();
            }

            if(result == true){
                return res.status(200).send(user);
            }
        })
    })
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;