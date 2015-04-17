'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var nodemailerConfig = require('../../config/nodemailer'); 
var Promise = require('bluebird'); 
var nodemailer = require('nodemailer'); 
var transport = nodemailerConfig.transporter; 
var sendMail = Promise.promisify(transport.sendMail, transport); 
var request = require('request'); 
var requestP = Promise.promisify(require('request')); 


// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if(err) { return handleError(res, err); }
    return res.json(200, customers);
  });
};

// Get all of my stores
exports.myStores = function(req, res) {
  Customer.findById(req.params.id).populate('stores').exec()
  .then(function (customers) {
    return res.json(customers);
  })
  .then(null, handleError(res));
};


// Get all of my qupeys 
exports.myQupeys = function(req, res) {
  Customer.findById(req.params.id).populate('qupeys').exec()
  .then(function (customers) {
    return res.json(customers);
  })
  .then(null, handleError(res));
};


exports.userContacts = function(req, res) {
  console.log('in here!!')
  // Customer.findById(req.params.id).populate('qupeys').exec()
  // .then(function (customers) {
  //   return res.json(customers);
  // })
  // .then(null, handleError(res));

  requestP('https://www.google.com/m8/feeds/contacts/ayana.d.i.wilson@gmail.com/full')
  .then(function (response){
    console.log('response: ', response)
    console.log('body??', response[0].body)
    return res.json(response)
  })
  .then(null, function (err){
    console.log('err: ', err)
  })
};



// send a qupey to my friends
// exports.myQupeys = function(req, res) {
//   // look up customer and find the qupey 
//   Customer.findById(req.params.id).populate('qupeys').exec()
//   .then(function (customer) {
//     for (var i = 0; i < customer.qupeys.length; i++){
//       if (req.body.id === customer.qupeys[i]._id){
//         // send qupey to the friend's email 
//         var options = {
//           from: 
//           to: req.body.friendEmail, 
//           subject: customer.name + 'sent you a qupey!', 
//           text: // some html here 
//         }
//         sendMail(options)
//         // handle res
//         .then()
//         // handle error 
//         .then(null, )

//       }
//     }
//   })
//   .then(null, handleError(res));
// };

// Get a single customer
exports.show = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  Customer.create(req.body, function(err, customer) {
    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    customer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res) {
  return function(err){
    return res.status(500).json(err);
  }
}