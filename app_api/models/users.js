var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    permissions: {
        type: [Number],
        required: true
    }
});

userSchema.methods.setPassword = function (password) {
    var cipher = crypto.createCipher('aes-256-ctr', password);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    this.password = crypted;
};

userSchema.methods.validPassword = function (password) {
    var cipher = crypto.createCipher('aes-256-ctr', password);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return this.password === crypted;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
