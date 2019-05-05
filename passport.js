"use strict";
/*import passport from 'passport';
import local from 'passport-local';
import {client_model} from './schema/client';
let localStrategy = local.Strategy;
passport.use(new localStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    let user = await client_model.findOne({'account.email' : email});
    if (!user) {
        return done(null, false, { message : 'Not User found.'});
    }
    else {
        let match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }
        else {
            return done(null, false, { message : 'Incorrect Password.' });
        }
    }
}));

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    client_model.findById(id, (error, user) => {
        done(error, user);
    });
});*/ 
