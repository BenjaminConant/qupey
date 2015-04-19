'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QupeyhashSchema = new Schema({
  email: String,
  qupeyId: {type: Schema.Types.ObjectId, ref: 'Qupey' },
 	storeId: {type: Schema.Types.ObjectId, ref: 'Store' }
});

module.exports = mongoose.model('Qupeyhash', QupeyhashSchema);