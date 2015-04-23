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
  type: {
  	discount: Number, 
  	details: String
  },
  expiration: {type: Date},
  shareable: {type: Boolean, default: false},
  shared: [{ 
    sender: String, 
    recipient: String
    }],
  shareCount: {type: Number},
  redeemedCount: {type: Number},
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
}, {strict: false});

module.exports = mongoose.model('Qupey', QupeySchema);