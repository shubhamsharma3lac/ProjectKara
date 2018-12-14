const User = require('../models/schemas/users');

function createUser(req, res, next){
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        hash: req.body.password,
        phone: req.body.phone,
        birthday: req.body.birthday,
        gender: req.body.gender
    })

    user.save(function(err, user){
        console.log(err);
    });
}

module.exports.createUser = createUser;