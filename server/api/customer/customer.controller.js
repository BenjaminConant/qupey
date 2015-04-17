'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var User = require('../user/user.model'); 
var Qupey = require('../qupey/qupey.model'); 
var nodemailerConfig = require('../../config/nodemailer'); 
var Promise = require('bluebird'); 
var nodemailer = require('nodemailer'); 
var transport = nodemailerConfig.transporter; 
var sendMail = Promise.promisify(transport.sendMail, transport); 
var request = require('request'); 
var requestP = Promise.promisify(require('request')); 
var mongoose = require('mongoose');
Promise.promisifyAll(mongoose)


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

// add my qupey to my array 
exports.addMyQupey = function(req, res) {
  // console.log('id: ', req.params.id, 'body: ', req.body.qupeyId)
  User.findById(req.params.id).exec()
  .then(function (customer) {
    customer.qupeys.push(req.body.qupeyId)
    return customer.saveAsync()  //promisified mongoose returns [saved]
  })
  .then(function(saved){
    // console.log('saved: ', saved)
    return res.json(saved[0]);    
  })
  .then(null, handleError(res));
};

// exports.userContacts = function(req, res) {
//   console.log('in here!!')
//   // Customer.findById(req.params.id).populate('qupeys').exec()
//   // .then(function (customers) {
//   //   return res.json(customers);
//   // })
//   // .then(null, handleError(res));

//   requestP('https://www.google.com/m8/feeds/contacts/ayana.d.i.wilson@gmail.com/full')
//   .then(function (response){
//     console.log('response: ', response)
//     console.log('body??', response[0].body)
//     return res.json(response)
//   })
//   .then(null, function (err){
//     console.log('err: ', err)
//   })
// };



// send a qupey to my friends
exports.sendQupey = function(req, res) {
  // req.user.... 
  // look up customer and find the qupey 
  // req body will hold both qupey id and the email
  User.findById(req.params.id).exec()
  .then(function (customer) {
    // send qupey to the friend's email 
    // use view qupey html to send here 
    var options = {
      from: 'qupeybusiness@gmail.com',
      to: req.body.friendEmail, 
      subject: customer.name + 'sent you a qupey!', 
      text: ''// some html here 
    }
    sendMail(options)
    // handle res
    .then(function(){
      //nodemailerConfig.transporter.close()
      transport.close(); 
    })
    .then(null, function(err){
      console.log('err: ', err)
    })
  })
  .then(null, handleError(res));
};

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