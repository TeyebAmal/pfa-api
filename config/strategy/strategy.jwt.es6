import {findUserById} from "../../models/UserModel";
import {ExtractJwt,Strategy} from 'passport-jwt'

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromHeader();
jwtOptions.secretOrKey = 'bintradhia';

exports.jwtOptions = jwtOptions;

let strategy = new Strategy(jwtOptions, (jwt_payload, next)=> {
    console.log('payload received', jwt_payload);
    // this is a database call:
    let user = findUserById(jwt_payload.id);
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});


export default strategy;