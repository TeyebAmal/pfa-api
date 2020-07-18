import express from 'express';
import { findUsers , findUserById , updateUser} from '../models/UserModel';

const Router = express.Router();

Router.route('/').get((req, res) => {
    
    findUsers().then(user => {
        res.json({user})
    }).catch(err => {
        console.log(err)
    })
});

Router.route('/:id').get((req, res) => {
    
    findUserById(req.params.id).then(user => {
        res.json({user})
    }).catch(err => {
        console.log(err)
    })
});

Router.route('/update/:id').post((req, res) => {
    
    updateUser(req.params.id,req.body).then(user => {
        res.json({user})
    }).catch(err => {
        console.log(err)
    })
});



export default Router;