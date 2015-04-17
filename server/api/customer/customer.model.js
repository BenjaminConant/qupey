'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var baseUser = require('../user/user.model').schema; 
var extend = require('mongoose-schema-extend');
var _ = require('lodash');

var CustomerSchema = baseUser.extend({
  qupeys: [{ type: Schema.Types.ObjectId, ref: 'Qupey' }],
  stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
});

CustomerSchema.pre('save', function(next){
	if (this.isNew){
		this.addRole('Customer')
	}
	next(); 
})

module.exports = mongoose.model('Customer', CustomerSchema);