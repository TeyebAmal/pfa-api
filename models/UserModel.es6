import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'
/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    type : String,
    gender : String,
    city : String,
    isVerified: {type: Boolean, default: false}
},{
    timestamps : true

});
/**
 * @param password
 * @description hash password
 * @return hash password
 */
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * @param password
 * @description checking if password is valid
 * @return true|false
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


/**
 *
 * @type {mongoose.Schema}
 */
exports.userSchema = userSchema;
let User = mongoose.model('User', userSchema);
exports.UserModel = User;




exports.addUser = (data) => {
    let newUser = new User({...data});
    newUser.password = newUser.generateHash(data.password);

    return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findUser = (email) => {
    return new Promise((reject, resolve) => {
        User.findOne({email : email}, (res , err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findUserById = (id) => {
    return new Promise((resolve , reject) => {
        User.findOne({_id : id}, (err , res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findUsers = () => {
    return new Promise((resolve , reject) => {
        User.find({}, (err , res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.updateUser = (id, obj) => {
    return new Promise((resolve , reject) => {
        User.findByIdAndUpdate(id, obj, {new : true },(err , res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.deleteUser = (id) => {
    return new Promise((reject, resolve) => {
        User.findByIdAndRemove(id, (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};
