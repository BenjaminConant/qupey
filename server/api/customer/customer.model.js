'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var baseUser = require('../user/user.model').schema; 
var extend = require('mongoose-schema-extend');

var CustomerSchema = baseUser.extend({
  qupeys: [{ type: Schema.Types.ObjectId, ref: 'Qupey' }],
  stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
});

module.exports = mongoose.model('Customer', CustomerSchema);