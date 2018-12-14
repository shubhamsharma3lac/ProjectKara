const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    // define schema here
    firstName: String,
    lastName: String,
    address: String,
    classYear: Number,
    email: String,
    phone: {type: String, required: false },
    phoneProvider: {type: String, required: false },
    isAdmin: Boolean,
    isSuperAdmin: Boolean,
    hash: { type: String, required: false },
    companyName: String,
    createdAt: Date,
    updatedAt: Date,
    intrests: [String],
    timeSpent: Number,
    birthday: Date,
    gender: String,
    country: String
});

userSchema.pre('save', function(callback){
    // TODO: hash password
    bcrypt.hash(this.hash, 10, (err, hash) => {
        if(err){
            console.log(err);
            throw new Error('error while hashing password');
        }

        this.hash = hash;
        callback();
    })
})

userSchema.methods.greet = function(){
    console.log('hi')
}

userSchema.methods.checkPassword = function(password){
    if(this.hash === password){
        return true;
    }

    return false;
}

var User = mongoose.model('User', userSchema);
module.exports = User;