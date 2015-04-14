'use strict';

var baseUser = ('../user/user.model').schema; 
var extend = require('mongoose-schema-extend');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = baseUser.extend({
  qupeys: [{ type: Schema.Types.ObjectId, ref: 'Qupey' }],
  stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
});

module.exports = mongoose.model('Customer', CustomerSchema);