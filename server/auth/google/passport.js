// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var GoogleContacts = require('google-contacts').GoogleContacts;
// var Promise = require('bluebird'); 
// Promise.promisifyAll(GoogleContacts)


// exports.setup = function (User, config) {
//   passport.use(new GoogleStrategy({
//       clientID: config.google.clientID,
//       clientSecret: config.google.clientSecret,
//       callbackURL: config.google.callbackURL, 
//       passReqToCallback: true
//     },
//     function(req, accessToken, refreshToken, profile, done) {
//       var c = new GoogleContacts({
//         token: accessToken,
//         consumerKey: config.google.clientID,
//         consumerSecret: config.google.clientSecret
//       });

//       c.on('error', function(e){
//         console.log('error', e);
//       });
//       c.on('contactsReceived', function (contacts) {
//         console.log('contacts: ' + contacts);
//       });
//       // figure out how to parse information 
//       c.getContacts(function(e){
//         User.findOne({ 'google.id': profile.id }).exec()
//         .then(function(user) {
//           // console.log('userTop: ', user)
//           if (!user) {
//             User.create({
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               roles: ['User', 'Customer'],
//               username: profile.username,
//               provider: 'google',
//               google: profile._json, 
//               contacts: c.contacts
//             })
//             .then(function(user) {
//               console.log('user created: ', user)
//               console.log('c: ', c)
//               return done(null, user);
//             })
//             .then(null, function(err) {
//               return done(err);
//             });
//           } else {
//             console.log('user found: ', user)
//             user.contacts = c.contacts;
//             user.save(function(err, saved){
//               return done(null, user);              
//             })
//           }
//         })
//         .then(null, function(err) {
//           return done(err);
//         });
//       });
//   }));
// };

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleContacts = require('google-contacts').GoogleContacts;
var Promise = require('bluebird'); 
var QupeyHash = require('../../api/qupeyHash/qupeyHash.model'); 
Promise.promisifyAll(GoogleContacts)


exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL, 
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      var c = new GoogleContacts({
        token: accessToken,
        consumerKey: config.google.clientID,
        consumerSecret: config.google.clientSecret
      });

      c.on('error', function(e){
        console.log('error', e);
      });
      c.on('contactsReceived', function (contacts) {
        console.log('contacts: ' + contacts);
      });
      // figure out how to parse information 
      c.getContacts(function(e){
        User.findOne({ 'google.id': profile.id }).exec()
        .then(function (user){
          QupeyHash.findOne({email: profile.emails[0].value}).exec()
          .then(function (qupeyHashForNonUser){
            // if the user isn't in the database and there is a qupey hash for them
            // we created the user and then add the qupeyhash data to the user obj
            if (!user && qupeyHashForNonUser) {
              User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                roles: ['User', 'Customer'],
                username: profile.username,
                provider: 'google',
                qupeys: [qupeyHashForNonUser.qupeyId],
                stores: [qupeyHashForNonUser.storeId],
                google: profile._json, 
                contacts: c.contacts
              })
              .then(function(user) {
                console.log('user created: ', user)
                return done(null, user);
              })
              .then(null, function(err) {
                return done(err);
              });
            }

            // if the user doesn't exist and there's no qupey hash then we 
            // just create the user, no data to add 
            else if (!user && !qupeyHashForNonUser){
              User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                roles: ['User', 'Customer'],
                username: profile.username,
                provider: 'google',
                google: profile._json, 
                contacts: c.contacts
              })
              .then(function(user) {
                console.log('user created: ', user)
                return done(null, user);
              })
              .then(null, function(err) {
                return done(err);
              });
            }
            // if the user exists then there will never be a qupey hash for them 
            else {
              user.contacts = c.contacts;
              user.save(function(err, saved){
                return done(null, user);              
              })
            }
          })
          .then(null, function(err){
            console.log('err: ', err)
          })
        })
        .then(null, function(err){
          console.log('err: ', err)
        })
      //end of getContacts 
      })
  //end of passport.use
  }));
};

