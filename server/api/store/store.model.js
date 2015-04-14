'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    /*
		To do: 
		 - add enums validation for store categories 
		 - filepicker config for images 
    */

var StoreSchema = new Schema({
  name: String, 
  contactInfo: {
  	phone: String, 
  	street: String,
    city: String, 
    state: String,
  	postalCode: Number
  },
  tagline: String, 
  icon: String,
  description: String,
  background_img: String,
  store_url: String,
  logo: String,  
  category: [String]  
  code: Number, 
  gold_qupey: { type: Schema.Types.ObjectId, ref: 'Qupey' },
  default_qupey: { type: Schema.Types.ObjectId, ref: 'Qupey' },
  customers: [{ type: Schema.Types.ObjectId, ref: 'Customer' }]
}, {strict: false});

module.exports = mongoose.model('Store', StoreSchema);