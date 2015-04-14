'use strict';

var baseUser = ('../user/user.model').schema; 
var extend = require('mongoose-schema-extend');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OwnerSchema = baseUser.extend({
  store: { type: Schema.Types.ObjectId, ref: 'Store' }
});

module.exports = mongoose.model('Owner', OwnerSchema);