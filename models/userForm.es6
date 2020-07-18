import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'
/**
 * Company Schema
 */
const FormSchema = new mongoose.Schema({
    fields: [{
        label: String,
        key: String,
        value: [String]
    }],

    form: { type: mongoose.Schema.Types.ObjectId, ref: 'form' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true

});


/**
 *
 * @type {mongoose.Schema}
 */
exports.FormSchema = FormSchema;
let FormUser = mongoose.model('FormUser', FormSchema);
exports.FormUserModel = FormUser;




exports.addFormUser = (data) => {
    let newFormUser = new FormUser({ ...data });

    return new Promise((resolve, reject) => {
        newFormUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.findFormByFormId = (id) => {
    return new Promise((resolve, reject) => {
        FormUser.find({form : id}, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


exports.AggregateAllForm = () => {
    return new Promise((reject, resolve) => {
        FormUser.aggregate([{"$group" : {_id:"$form", count:{$sum:1}}}
        ], (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findAllForm = () => {
    return new Promise((resolve, reject) => {
        FormUser.count({}, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findFormByUserId = (id) => {
    return new Promise((reject, resolve) => {
        FormUser.find({ user: id }, (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};
