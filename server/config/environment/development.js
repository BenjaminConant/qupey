'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/qupey-dev'
  },

 google: {
  	clientID: '428742057488-mrk834aop6cjb7akghkp2b8r2dg9v3m5.apps.googleusercontent.com',
  	clientSecret: '8YBFLxbRC_k_eIcG4jnmVry_',
  	callbackURL: 'http://127.0.0.1:9000/auth/google/oauth2callback'
  },

  seedDB: false
};
