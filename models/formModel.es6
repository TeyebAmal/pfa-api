import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';

const Schema = mongoose.Schema;

const field = new Schema(
    {
        common_name: String,
        id: String,
        name: String,
        probability: Number
        
    },
    { _id: false }
  );

let FormSchema = new Schema({
    Diagnosis : [field],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true
});


exports.FormSchema = FormSchema;
let Form = mongoose.model('stats', FormSchema);
exports.FormModel = Form;


exports.addForm = (inputForm) => {
    let newForm = new Form({...inputForm});
    return new Promise((resolve, reject) => {
        newForm.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findFormByUserId = (id) => {
    return new Promise((resolve, reject) => {
        Form.find({user: id})
            .exec((err, res) => {
                console.log(err)
                err ? reject(err) : resolve(res);
            });
    });
};


exports.updateForm = (id, data) => {
    return new Promise((resolve, reject) => {
        Form.update({_id: id}, data).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        Form.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        Form.findOne({
            _id: id
        }).exec((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.deleteForm = (id) => {
    return new Promise((resolve, reject) => {
        Form.findByIdAndRemove(id, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};