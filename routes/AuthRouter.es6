import express from 'express';
import { findUser } from '../models/UserModel';
import jwt from "jsonwebtoken";
import { jwtOptions } from '../config/strategy/strategy.jwt';
import jwtDecode from 'jwt-decode';

const Router = express.Router();

Router.route('/decode').post((req, res) => {
    let token = req.body.token;
    let decodedToken = jwtDecode(token);
    res.json({ decodedToken: decodedToken });
});


Router.route('/verify-token').post((req, res) => {
    let token = req.body.token;
    jwt.verify(token,'bintradhia',function (err,authorizedata)
    {
        if(err)
        {
            res.sendStatus(403);
        }
        else
        {
            res.json({
                message : 'Successful log in',
                authorizedata
            });
        }

    });
});

Router.route('/user').post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    findUser(email).then((user) => {
        if (!user) {
            return res.status(400).json({
                success: false,
                message: {
                    email: 'invalid email'
                }
            });
        }
        if (user.validPassword(password)) {
            let payload = {
                user: {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            };
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                data: payload
            }, jwtOptions.secretOrKey);
            res.send({
                success: true,
                token: token,
                user: user,
                message: {}
            });
        } else {
            return res.status(400).json({
                success: false,
                message: {
                    password: "passwords did not match"
                }
            });
        }

    }).catch(err => res.status(400).send({
        success: false,
        message: { user: "no such user found" }
    }));

});


Router.route('/register').post((req, res) => {
    const user = { ...req.body, isVerified: false };
    user.role = 'user';
    addUser(user).then(user => {
        console.log(user);
        res.json({ success: true })
    }).catch(err => {
        console.log(err)
    })

});


export default Router;