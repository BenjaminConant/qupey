'use strict';

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var baseUser = require('../user/user.model').schema; 
var extend = require('mongoose-schema-extend');

var OwnerSchema = baseUser.extend({
  store: { type: Schema.Types.ObjectId, ref: 'Store' }
});

OwnerSchema.pre('save', function(next){
	if (this.isNew){
		this.addRole('Owner')
	}
	next(); 
})

module.exports = mongoose.model('Owner', OwnerSchema);