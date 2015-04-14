'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var statusStates = ['default', 'gold']

var percentageSchema = new Schema({
  discount: {type: Number}, 
  details: String
});

var QupeySchema = new Schema({
 	name: String, 
 	status: { type: String, default: 'default', enum: statusStates},
  type: percentageSchema,
  expiration: {type: Date},
  shareable: {type: Boolean, default: false},
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
}, {strict: false});

module.exports = mongoose.model('Qupey', QupeySchema);