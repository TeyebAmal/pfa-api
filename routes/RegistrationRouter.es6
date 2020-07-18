import express from 'express';
import {addUser , findUsers} from '../models/UserModel';
import jwt from "jsonwebtoken";
import {jwtOptions} from '../config/strategy/strategy.jwt';
import jwtDecode from 'jwt-decode';

const Router = express.Router();

Router.route('/user').post((req, res) => {
    req.body.type = "tester"
    addUser(req.body).then(user => {
        res.json({success: true})
    }).catch(err => {
        console.log(err)
    })
});

Router.route('/user').get((req, res) => {
    
    findUsers().then(user => {
        res.json({user})
    }).catch(err => {
        console.log(err)
    })
});



export default Router;